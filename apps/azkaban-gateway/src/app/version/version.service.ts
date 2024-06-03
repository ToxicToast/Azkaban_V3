import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  AuthTopics,
  GroupsTopics,
  NotifyTopics,
  UserTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class VersionService {
  constructor(
    @Inject('WEBHOOKS_SERVICE') private readonly hooksClient: ClientProxy,
    @Inject('APIALERTS_SERVICE') private readonly apialertsClient: ClientProxy,
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationsClient: ClientProxy,
    @Inject('SSE_SERVICE') private readonly sseClient: ClientProxy,
    //
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('GROUP_SERVICE') private readonly groupClient: ClientProxy,
    //
    @Inject('APP_VERSION') private readonly appVersion: string,
  ) {}

  getGatewayVersion() {
    return {
      gateway: this.appVersion,
    };
  }

  async getWebhooksVersion() {
    return await this.hooksClient.send(NotifyTopics.VERSION, {}).toPromise();
  }

  async getApiAlertsVersion() {
    return await this.apialertsClient
      .send(NotifyTopics.VERSION, {})
      .toPromise();
  }

  async getNotificationsVersion() {
    return await this.notificationsClient
      .send(NotifyTopics.VERSION, {})
      .toPromise();
  }

  async getSSEVersion() {
    return await this.sseClient.send(NotifyTopics.VERSION, {}).toPromise();
  }

  async getUsersVersion() {
    return await this.usersClient.send(UserTopics.VERSION, {}).toPromise();
  }

  async getAuthVersion() {
    return await this.authClient.send(AuthTopics.VERSION, {}).toPromise();
  }

  async getGroupsVersion() {
    return await this.groupClient.send(GroupsTopics.VERSION, {}).toPromise();
  }
}
