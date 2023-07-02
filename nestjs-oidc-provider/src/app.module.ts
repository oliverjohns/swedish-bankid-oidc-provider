import { Module } from "@nestjs/common";
import { OidcModule } from "nest-oidc-provider";
import { OidcConfigModule } from "./config/oidc-config.module";
import { OidcConfigService } from "./config/oidc-config.service";
import { AppController } from "./app.controller";
import { InteractionModule } from "./interaction/interaction.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    OidcModule.forRootAsync({
      imports: [OidcConfigModule],
      useExisting: OidcConfigService,
    }),
    InteractionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
