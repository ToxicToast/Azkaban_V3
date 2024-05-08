import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class VersionService {
  constructor(@Inject('APP_VERSION') private readonly appVersion: string) {}

  getGatewayVersion() {
    return {
      gateway: this.appVersion,
    };
  }

  async getAuthVersion() {
    return {
      auth: 'not available',
    };
  }

  async getGroupsVersion() {
    return {
      groups: 'not available',
    };
  }

  async getUsersVersion() {
    return {
      users: 'not available',
    };
  }
}
