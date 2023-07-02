import { Module } from '@nestjs/common';
import { OidcConfigService } from './oidc-config.service';

@Module({
  imports: [],
  providers: [OidcConfigService],
  exports: [OidcConfigService],
})
export class OidcConfigModule {}
