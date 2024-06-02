import { Inject, Injectable } from '@nestjs/common';
import { CircuitBreakerService } from '../circuitbreaker/circuitbreaker.service';
import { ClientProxy } from '@nestjs/microservices';
import { GroupsTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Optional } from '@toxictoast/azkaban-base-types';
import { GroupDAO } from '@azkaban/group-infrastructure';

@Injectable()
export class GroupsService {
  constructor(
    private readonly circuitbreaker: CircuitBreakerService,
    @Inject('GROUP_SERVICE') private readonly client: ClientProxy,
  ) {}

  async getGroups(limit: number, offset: number): Promise<Array<GroupDAO>> {
    return this.circuitbreaker.execute(GroupsTopics.LIST, async () => {
      return await this.client
        .send(GroupsTopics.LIST, { limit, offset })
        .toPromise();
    });
  }

  async getGroupById(id: string): Promise<GroupDAO> {
    return this.circuitbreaker.execute(GroupsTopics.ID, async () => {
      return await this.client.send(GroupsTopics.ID, { id }).toPromise();
    });
  }

  async createGroup(title: string): Promise<GroupDAO> {
    return this.circuitbreaker.execute(GroupsTopics.CREATE, async () => {
      return await this.client.send(GroupsTopics.CREATE, { title }).toPromise();
    });
  }

  async updateGroup(
    id: string,
    title?: Optional<string>,
    slug?: Optional<string>,
    active?: Optional<boolean>,
  ): Promise<GroupDAO> {
    return this.circuitbreaker.execute(GroupsTopics.UPDATE, async () => {
      return await this.client
        .send(GroupsTopics.UPDATE, { id, title, slug, active })
        .toPromise();
    });
  }

  async deleteGroup(id: string): Promise<GroupDAO> {
    return this.circuitbreaker.execute(GroupsTopics.DELETE, async () => {
      return await this.client.send(GroupsTopics.DELETE, { id }).toPromise();
    });
  }

  async restoreGroup(id: string): Promise<GroupDAO> {
    return this.circuitbreaker.execute(GroupsTopics.RESTORE, async () => {
      return await this.client.send(GroupsTopics.RESTORE, { id }).toPromise();
    });
  }
}
