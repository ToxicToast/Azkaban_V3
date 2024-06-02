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
        notifications: await this.service.getNotificationsVersion(),
        webhooks: await this.service.getWebhooksVersion(),
        alerts: await this.service.getApiAlertsVersion(),
        sse: await this.service.getSSEVersion(),
      },
      auth: await this.service.getAuthVersion(),
      users: await this.service.getUsersVersion(),
      groups: await this.service.getGroupsVersion(),
    };
  }
}
