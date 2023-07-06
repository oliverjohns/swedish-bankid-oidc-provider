import { Module } from "@nestjs/common";
import { OidcConfigModule } from "./config/oidc-config.module";
import { OidcConfigService } from "./config/oidc-config.service";
import { InteractionModule } from "./interaction/interaction.module";
import { ScheduleModule } from "@nestjs/schedule";
import { OidcModule } from "./oidc";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    OidcModule.forRootAsync({
      imports: [OidcConfigModule],
      useExisting: OidcConfigService,
    }),
    InteractionModule,
  ],
})
export class AppModule {}
