import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { Provider } from "oidc-provider";
import { Request, Response } from "express";
import { createHmac } from "node:crypto";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { BankIdClient, CompletionData } from "./bankid";
import { getMessage } from "./messages";
import { InteractionHelper, Oidc } from "src/oidc";

type BankIdAuthState = {
  initiatedAt: Date;
  startTime: number;
  qrStartToken: string;
  qrStartSecret: string;
  orderRef: string;
  status: string; //"pending" | "failed" | "complete";
  message?: string;
  pollingCronJob?: CronJob;
  completionData?: CompletionData;
};
type OidcInteractionUid = string;

/**
 * !!! This is just for example, don't use this in any real case !!!
 */
@Controller("/interaction")
export class InteractionController {
  private readonly logger = new Logger(InteractionController.name);
  client: BankIdClient;
  cache = new Map<OidcInteractionUid, BankIdAuthState>();
  constructor(
    private readonly provider: Provider,
    private schedulerRegistry: SchedulerRegistry
  ) {
    this.client = new BankIdClient({
      pfx: "./cert/FPTestcert4_20220818.p12",
      passphrase: "qwerty123",
      production: false,
    });
  }

  /**
   * Get the first animated qr and store important values in cache
   **/
  async startQr(
    qrStartSecret: string,
    qrStartToken: string,
    orderRef: string,
    oidcInteractionUid: string
  ) {
    const now = Date.now();
    const state: BankIdAuthState = {
      initiatedAt: new Date(),
      startTime: now,
      qrStartSecret,
      qrStartToken,
      orderRef,
      status: "pending",
    };
    this.cache.set(oidcInteractionUid, state);
    return this.generateQr(state.qrStartSecret, state.qrStartToken, 0);
  }

  /**
   * Generate next animated qr based on time and values in cache
   **/
  async nextQr(oidcInteractionUid: string) {
    const state = this.cache.get(oidcInteractionUid);
    if (!state) {
      return;
    }
    const qrTime = parseInt(`${(Date.now() - state.startTime) / 1000}`, 10);
    return this.generateQr(state.qrStartSecret, state.qrStartToken, qrTime);
  }

  generateQr(qrStartSecret: string, qrStartToken: string, time: number) {
    const qrAuthCode = createHmac("sha256", qrStartSecret)
      .update(`${time}`)
      .digest("hex");
    return `bankid.${qrStartToken}.${time}.${qrAuthCode}`;
  }

  @Get("qr/:uid")
  async qr(@Param("uid") uid: string, @Res() res: Response) {
    try {
      const qrCode = await this.nextQr(uid);
      if (!qrCode) {
        throw new BadRequestException("No qr found");
      }
      res.send({ qr: qrCode });
    } catch (e) {
      this.logger.error(e);
      res.status(500).send(e.message);
    }
  }

  @Get("status/:uid")
  async status(@Param("uid") uid: string, @Res() res: Response) {
    try {
      const state = this.cache.get(uid);
      if (!state) {
        throw new BadRequestException(
          `No BankID login session found for uid ${uid}`
        );
      }

      res.send(
        JSON.stringify({
          status: state.status,
          message: state.message,
        })
      );
    } catch (e) {
      this.logger.error(e);
      res.status(500).send(e.message);
    }
  }

  @Get(":uid")
  async login(
    @Oidc.Interaction() interaction: InteractionHelper,
    @Req() request: Request,
    @Res() res: Response
  ) {
    try {
      const { prompt, params, uid } = await interaction.details();
      console.log("request", request.headers, request.ip);

      this.logger.log(`BankID Auth started for uid ${uid}, ip ${request.ip}`);
      const { autoStartToken, orderRef, qrStartSecret, qrStartToken } =
        await this.client.authenticate({
          endUserIp: request.ip,
        });

      const qrCode = await this.startQr(
        qrStartSecret,
        qrStartToken,
        orderRef,
        uid
      );

      const job = new CronJob(`*/4 * * * * *`, () => {
        this.logger.log(
          `BankID Collect job running for ${uid} , orderRef ${orderRef}`
        );
        this.client.collect({ orderRef }).then((res) => {
          res.hintCode;
          this.logger.log(
            `BankID Collect job orderRef ${orderRef} status ${res.status} hintCode ${res.hintCode}`
          );
          if (res.status === "complete" || res.status === "failed") {
            const state = this.cache.get(uid);
            state.pollingCronJob?.stop();
            this.schedulerRegistry.deleteCronJob(uid);
            this.cache.set(uid, {
              ...state,
              status: res.status,
              completionData: res.completionData,
              message: getMessage(res.status, res.hintCode)?.swedish,
            });
          }
        });
      });
      this.schedulerRegistry.addCronJob(uid, job);
      job.start();

      const client = await this.provider.Client.find(
        params.client_id as string
      );

      res.render(prompt.name, {
        details: prompt.details,
        client,
        params: {
          ...params,
          bankid_url: `bankid:///?autostarttoken=${autoStartToken}&redirect=null`,
          qr_code: qrCode,
        },
        uid,
      });
    } catch (e) {
      this.logger.error(`BankID auth start failed`, e);
      console.log(e);
    }
  }

  @Post(":uid")
  async loginCheck(
    @Oidc.Interaction() interaction: InteractionHelper,
    @Body() form: Record<string, string>
  ) {
    const { prompt, params, uid } = await interaction.details();

    const state = this.cache.get(uid);

    this.logger.log(
      `BankID auth finished for ${uid}! Removing cached state...`
    );
    this.cache.delete(uid);

    if (state?.status !== "complete") {
      this.logger.error(`Missing BankID successful auth for uid ${uid}`);
      throw new BadRequestException("Missing BankID successful auth");
    }

    if (prompt.name !== "login") {
      throw new BadRequestException("invalid prompt name");
    }

    this.logger.debug(`Login UID: ${uid}`);
    this.logger.debug(`Login user: ${form.user}`);
    this.logger.debug(`Client ID: ${params.client_id}`);

    await interaction.finished(
      {
        login: {
          accountId: state.completionData?.user.personalNumber,
          //email: "dummyemail@test.com",
        },
      },
      { mergeWithLastSubmission: false }
    );
  }

  @Post(":uid/confirm")
  async confirmLogin(@Oidc.Interaction() interaction: InteractionHelper) {
    const interactionDetails = await interaction.details();
    const { prompt, params, session } = interactionDetails;
    let { grantId } = interactionDetails;

    const grant = grantId
      ? await this.provider.Grant.find(grantId)
      : new this.provider.Grant({
          accountId: session.accountId,
          clientId: params.client_id as string,
        });

    if (prompt.details.missingOIDCScope) {
      const scopes = prompt.details.missingOIDCScope as string[];
      grant.addOIDCScope(scopes.join(" "));
    }

    if (prompt.details.missingOIDCClaims) {
      grant.addOIDCClaims(prompt.details.missingOIDCClaims as string[]);
    }

    if (prompt.details.missingResourceScopes) {
      for (const [indicator, scopes] of Object.entries(
        prompt.details.missingResourceScopes
      )) {
        grant.addResourceScope(indicator, (scopes as string[]).join(" "));
      }
    }

    grantId = await grant.save();

    await interaction.finished(
      {
        consent: {
          grantId,
        },
      },
      { mergeWithLastSubmission: true }
    );
  }

  @Get(":uid/abort")
  async abortLogin(@Oidc.Interaction() interaction: InteractionHelper) {
    const { uid } = await interaction.details();
    const state = this.cache.get(uid);
    this.logger.log(`BankID auth aborted for ${uid}! Removing cached state...`);
    state.pollingCronJob?.stop();
    this.schedulerRegistry.deleteCronJob(uid);
    this.cache.delete(uid);
    const result = {
      error: "access_denied",
      error_description: "End-user aborted interaction",
    };

    await interaction.finished(result, { mergeWithLastSubmission: false });
  }
}
