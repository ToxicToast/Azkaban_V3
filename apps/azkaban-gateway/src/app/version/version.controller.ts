import { Controller, Get, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { VersionService } from './version.service';

@UseGuards(ThrottlerGuard)
@Controller('version')
export class VersionController {
  constructor(private readonly service: VersionService) {}

  @Get()
  async getVersion() {
    const gateway = this.service.getGatewayVersion();
    //
    return {
      ...gateway,
      notify: {
        webhooks: await this.service.getWebhooksVersion(),
        alerts: await this.service.getApiAlertsVersion(),
        notifications: await this.service.getNotificationsVersion(),
        sse: await this.service.getSSEVersion(),
      },
    };
  }
}
