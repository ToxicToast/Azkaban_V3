import { Controller, Get, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { VersionService } from './version.service';

@UseGuards(ThrottlerGuard)
@Controller()
export class VersionController {
  constructor(private readonly service: VersionService) {}

  @Get()
  async getVersion() {
    const gateway = this.service.getGatewayVersion();
    const auth = await this.service.getAuthVersion();
    const groups = await this.service.getGroupsVersion();
    const users = await this.service.getUsersVersion();
    const webhooks = await this.service.getWebhooksVersion();
    //
    return {
      ...gateway,
      webhooks,
      auth,
      groups,
      users,
    };
  }
}
