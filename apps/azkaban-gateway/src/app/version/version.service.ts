import { Inject, Injectable, Logger } from '@nestjs/common';
import { CircuitBreakerService } from '../circuitbreaker/circuitbreaker.service';
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
    private readonly circuitbreaker: CircuitBreakerService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('GROUP_SERVICE') private readonly groupClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('WEBHOOKS_SERVICE') private readonly hooksClient: ClientProxy,
    @Inject('APP_VERSION') private readonly appVersion: string
  ) {}

  getGatewayVersion() {
    return {
      gateway: this.appVersion,
    };
  }

  async getAuthVersion() {
    return this.circuitbreaker.execute(
      AuthTopics.VERSION,
      async () => {
        return await this.authClient.send(AuthTopics.VERSION, {}).toPromise();
      },
      true
    );
  }

  async getGroupsVersion() {
    return this.circuitbreaker.execute(
      GroupsTopics.VERSION,
      async () => {
        return await this.groupClient
          .send(GroupsTopics.VERSION, {})
          .toPromise();
      },
      true
    );
  }

  async getUsersVersion() {
    return this.circuitbreaker.execute(
      UserTopics.VERSION,
      async () => {
        return await this.userClient.send(UserTopics.VERSION, {}).toPromise();
      },
      true
    );
  }

  async getWebhooksVersion() {
    return this.circuitbreaker.execute(
      NotifyTopics.VERSION,
      async () => {
        return await this.hooksClient
          .send(NotifyTopics.VERSION, {})
          .toPromise();
      },
      true
    );
  }
}
