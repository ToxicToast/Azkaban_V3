import { Controller, Get, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { VersionService } from './version.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('monitoring')
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
      user: await this.service.getUsersVersion(),
      auth: await this.service.getAuthVersion(),
    };
  }
}
