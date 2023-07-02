import {
  OidcConfiguration,
  OidcModuleOptions,
  OidcModuleOptionsFactory,
} from "nest-oidc-provider";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OidcConfigService implements OidcModuleOptionsFactory {
  constructor() {}

  createModuleOptions(): OidcModuleOptions | Promise<OidcModuleOptions> {
    return {
      issuer: "http://localhost:3001",
      path: "/oidc",
      oidc: this.getConfiguration(),
    };
  }

  getConfiguration(): OidcConfiguration {
    return {
      // Used to skip the consent step
      async loadExistingGrant(ctx) {
        const grant = new ctx.oidc.provider.Grant({
          clientId: ctx.oidc.client.clientId,
          accountId: ctx.oidc.session.accountId,
        });

        grant.addOIDCScope("openid email profile");
        grant.addOIDCClaims(["email"]);
        grant.addResourceScope(
          "urn:example:resource-indicator",
          "api:read api:write"
        );
        await grant.save();
        return grant;
      },
      // This function retun the account in your system/db using the personal number
      findAccount: async (ctx, id) => {
        console.warn(
          "RETURNING DUMMY ACCOUNT! (Write your own findAccount implementation here)"
        );
        return {
          accountId: id,
          claims: () => ({
            sub: id,
            email: `${id}@example.com`,
            profile: {
              email: `${id}@example.com`,
            },
          }),
        };
      },
      claims: {
        openid: ["sub", "email"],
        profile: ["name", "email", "email_verified"],
      },
      ttl: {
        Interaction: 5 * 60,
        Grant: 5 * 60,
        DeviceCode: 10 * 60,
        AccessToken: 60 * 60,
        AuthorizationCode: 10 * 60,
        IdToken: 60 * 60,
        RefreshToken: 60 * 60 * 24,
        Session: 60 * 60,
      },
      clients: [
        {
          client_id: "bankid",
          client_secret: "supersecret123",
          client_name: "bankid",
          response_types: ["code"],
          token_endpoint_auth_method: "none",
          application_type: "web",
          redirect_uris: ["http://localhost:3000/api/auth/callback/bankid"],
        },
      ],
      pkce: {
        methods: ["S256"],
        required: () => false,
      },
      scopes: [
        "openid",
        "offline_access",
        "profile",
        "email",
        "phone",
        "address",
      ],
      features: {
        devInteractions: {
          enabled: false,
        },
      },
      interactions: {
        url(_, interaction) {
          return `/interaction/${interaction.uid}`;
        },
      },
      cookies: {
        keys: [
          "gQMQym96H64-QInq7mvVX0nZEw0qUmcTA3bCpfnuR1h3YXNhgGJ0XLd17obmV8Gm",
        ],
      },
      jwks: {
        keys: [
          {
            kty: "RSA",
            kid: "UWXekTvfWi6o3wfYL9Wbd4f819MKevyQ0V4ksVn_YR0",
            use: "sig",
            alg: "RS256",
            e: "AQAB",
            n: "oyyqyR4rqOVxj6BhnhETZ3mQclECY4w7dMLzOdU9L514JtSmXFfsbL7sLC-Y6y88mTK7JZs073HMYgTJZqIBThxjl_F-TRoO5Svi488GsCk5osgP9xQul-4yx1gfqeQhQZdxo73R0EjO_kZR_i85AAz-O0BvUNiayeYUU23pNU_Q_fIZ-IWRSD15JeNNuROVkjpR8ocpEtOVsb3x0PpCzpkxXb7gh8HYpCHaJEj2k8mJstuOfLOm-eIHcrUv7uEYzSWSK6tfFNFsdwmHioRlY2-ASuvxq9Xqplz9-K5tW3dYE3B3wNIPdYPOAhpSwsD7dlwfM_lj269QULfsYDKnRQ",
            d: "j-S24s5BUBqtryuOifai9u_jqnu3sJOcZtX36TsbTt79cri5z9sVObyPxlNe9Z7dQHfVQ0-AOdtPkeyIsoIQxpIQXZBvgYyGMCAoYB5T1os0MVFditR4VjCPBO24Vng_v3jOlMeyu4tJRkA60_1OtbW_h_7FazToIz1LFVtqeUB15ZczdjejAj4zQWTdLDyfL1Ez2d_KISq83q4XcwI3kgAsjCvkYAzR42jnrJB3W9tR1X9AYI6bsb1LVZCHlvAGJf6zrPTNhBz2owcs7YGPMwnxRLO0JZ__lr-f513Q9YkuBzCf14YhFBNkUGzH-52tcFZRfy50e9NaG-u-BU3wTQ",
            p: "0_HqVVfKJ1BXYnuOWMEd4eC8nS4Og-CZwi8nvKR3FqRKFSiST6Q0PIi1JQXi4SviIyvEdyUXc_aP8KrgjP8ervW6XiYmT1UKwMkhauIiCpOw7MsCMzt0Ol_EOgAXiCupMny0-NPEqzKx3e-64cvQq3V0hZnM-l0rHVKnABBfnu8",
            q: "xRePZvrTSLhlI_7uq6LWRsYrz5afPq18DZNuxTg8Dp-PzVZNFxIV1EYB370BJYhaJ7d81vaWsTFtrj89cK9hnOtMqr_slo0YSGBk10PX5mPaG_Wlx_u7V8BUguVTiq320kVRXwqCYRNB4YaYpvbQ8j345fmogAETQgZ6hCZGXQs",
            dp: "yrmUaPlF1YDVdM-2AlMFoC50euu42o-UwtaT7a5qcm_GpKJgAGmRxW0Fx1nv_20YKogMreH-ot7uI0du7a6AzN0h3DglYLB5TpmTq0aNRQyrqHMtsY9mxwcfDFNWLtuERVRfTbpRXWdqFlzdpmhrOfVo9Pl9xOQk_zE1p6wBqmU",
            dq: "SLesnR4mHkqKZoGEpabq0CoFuA2mq4Vuo8OltvZMkkik0enpf32YuD0sK9ScO7DXMpgsY1OPvciy4vtKO-05YqAeJVGyhMmCEBIgopvRaJumuXIkvGhQcsvvYmwiKqSM0H_qydoiyJZGVGNIpzGhXf8nehJm7PN4m3-wbFmC1Ik",
            qi: "Wr4sxOqITkM1VrlwUGe9S3q8lbQJD1_nVM-x862jckuRuhtfq5HooOcJs2eVxEZLvwxnKvuMCtrrdkeQt6ORdGXjU2xNMzBV2ohvksh4nd-dAbt1k4sz_h-6SOfWOzQz3f9x6aRQabvwUfUR3TmnrZWNmgXO7b9RJEWYB6K8aWo",
          },
        ],
      },
    };
  }
}
