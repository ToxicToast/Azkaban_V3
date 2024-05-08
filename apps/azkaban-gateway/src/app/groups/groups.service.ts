import { Inject, Injectable } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';
import { CircuitBreakerService } from '../circuitbreaker/circuitbreaker.service';
import { ClientRMQ } from '@nestjs/microservices';
import { GroupsTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class GroupsService {
  constructor(
    private readonly circuitbreaker: CircuitBreakerService,
    @Inject('AZKABAN_SERVICE') private readonly client: ClientRMQ
  ) {}

  async getGroups(limit: number, offset: number): Promise<void> {
    return this.circuitbreaker.execute(GroupsTopics.LIST, async () => {
      return await this.client
        .send(GroupsTopics.LIST, { limit, offset })
        .toPromise();
    });
  }

  async getGroupById(id: string): Promise<void> {
    return this.circuitbreaker.execute(GroupsTopics.ID, async () => {
      return await this.client.send(GroupsTopics.ID, { id }).toPromise();
    });
  }

  async createGroup(title: string, active?: Optional<boolean>): Promise<void> {
    return this.circuitbreaker.execute(GroupsTopics.CREATE, async () => {
      return await this.client
        .send(GroupsTopics.CREATE, { title, active })
        .toPromise();
    });
  }

  async updateGroup(
    id: string,
    title?: Optional<string>,
    active?: Optional<boolean>
  ): Promise<void> {
    return this.circuitbreaker.execute(GroupsTopics.UPDATE, async () => {
      return await this.client
        .send(GroupsTopics.UPDATE, { id, title, active })
        .toPromise();
    });
  }

  async deleteGroup(id: string): Promise<void> {
    return this.circuitbreaker.execute(GroupsTopics.DELETE, async () => {
      return await this.client.send(GroupsTopics.DELETE, { id }).toPromise();
    });
  }

  async restoreGroup(id: string): Promise<void> {
    return this.circuitbreaker.execute(GroupsTopics.RESTORE, async () => {
      return await this.client.send(GroupsTopics.RESTORE, { id }).toPromise();
    });
  }
}
