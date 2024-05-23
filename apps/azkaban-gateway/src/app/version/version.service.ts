import { Inject, Injectable } from '@nestjs/common';
import { CircuitBreakerService } from '../circuitbreaker/circuitbreaker.service';
import { ClientProxy } from '@nestjs/microservices';
import {
  AuthTopics,
  NotifyTopics,
  UserTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class VersionService {
  constructor(
    private readonly circuitbreaker: CircuitBreakerService,
    @Inject('WEBHOOKS_SERVICE') private readonly hooksClient: ClientProxy,
    @Inject('APIALERTS_SERVICE') private readonly apialertsClient: ClientProxy,
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationsClient: ClientProxy,
    @Inject('SSE_SERVICE') private readonly sseClient: ClientProxy,
    //
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    //
    @Inject('APP_VERSION') private readonly appVersion: string,
  ) {}

  getGatewayVersion() {
    return {
      gateway: this.appVersion,
    };
  }

  async getWebhooksVersion() {
    return this.circuitbreaker.execute(
      NotifyTopics.VERSION,
      async () => {
        return await this.hooksClient
          .send(NotifyTopics.VERSION, {})
          .toPromise();
      },
      true,
    );
  }

  async getApiAlertsVersion() {
    return this.circuitbreaker.execute(
      NotifyTopics.VERSION,
      async () => {
        return await this.apialertsClient
          .send(NotifyTopics.VERSION, {})
          .toPromise();
      },
      true,
    );
  }

  async getNotificationsVersion() {
    return this.circuitbreaker.execute(
      NotifyTopics.VERSION,
      async () => {
        return await this.notificationsClient
          .send(NotifyTopics.VERSION, {})
          .toPromise();
      },
      true,
    );
  }

  async getSSEVersion() {
    return this.circuitbreaker.execute(
      NotifyTopics.VERSION,
      async () => {
        return await this.sseClient.send(NotifyTopics.VERSION, {}).toPromise();
      },
      true,
    );
  }

  async getUsersVersion() {
    return this.circuitbreaker.execute(
      UserTopics.VERSION,
      async () => {
        return await this.usersClient.send(UserTopics.VERSION, {}).toPromise();
      },
      true,
    );
  }

  async getAuthVersion() {
    return this.circuitbreaker.execute(
      AuthTopics.VERSION,
      async () => {
        return await this.authClient.send(AuthTopics.VERSION, {}).toPromise();
      },
      true,
    );
  }
}
