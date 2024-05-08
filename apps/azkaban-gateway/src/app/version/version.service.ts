import { Inject, Injectable } from '@nestjs/common';
import { CircuitBreakerService } from '../circuitbreaker/circuitbreaker.service';
import { ClientRMQ } from '@nestjs/microservices';
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
    @Inject('AZKABAN_SERVICE') private readonly client: ClientRMQ,
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
        return await this.client.send(AuthTopics.VERSION, {}).toPromise();
      },
      true
    );
  }

  async getGroupsVersion() {
    return this.circuitbreaker.execute(
      GroupsTopics.VERSION,
      async () => {
        return await this.client.send(GroupsTopics.VERSION, {}).toPromise();
      },
      true
    );
  }

  async getUsersVersion() {
    return this.circuitbreaker.execute(
      UserTopics.VERSION,
      async () => {
        return await this.client.send(UserTopics.VERSION, {}).toPromise();
      },
      true
    );
  }

  async getWebhooksVersion() {
    return this.circuitbreaker.execute(
      NotifyTopics.VERSION,
      async () => {
        return await this.client.send(NotifyTopics.VERSION, {}).toPromise();
      },
      true
    );
  }
}
