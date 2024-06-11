import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GroupsTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Optional } from '@toxictoast/azkaban-base-types';
import { GroupDAO } from '@azkaban/group-infrastructure';
import { NotifyService } from './notify.service';

@Injectable()
export class GroupsService {
    constructor(
        @Inject('GROUP_SERVICE') private readonly client: ClientProxy,
        private readonly notifSerivce: NotifyService,
    ) {}

    async getGroups(limit: number, offset: number): Promise<Array<GroupDAO>> {
        return await this.client
            .send(GroupsTopics.LIST, { limit, offset })
            .toPromise();
    }

    async getGroupById(id: string): Promise<GroupDAO> {
        return await this.client.send(GroupsTopics.ID, { id }).toPromise();
    }

    async createGroup(title: string): Promise<GroupDAO> {
        return await this.client
            .send(GroupsTopics.CREATE, { title })
            .toPromise()
            .then((group) => {
                this.notifSerivce.onCreate(group.id, group.title);
                return group;
            });
    }

    async updateGroup(
        id: string,
        title?: Optional<string>,
        slug?: Optional<string>,
        active?: Optional<boolean>,
    ): Promise<GroupDAO> {
        return await this.client
            .send(GroupsTopics.UPDATE, { id, title, slug, active })
            .toPromise();
    }

    async deleteGroup(id: string): Promise<GroupDAO> {
        return await this.client.send(GroupsTopics.DELETE, { id }).toPromise();
    }

    async restoreGroup(id: string): Promise<GroupDAO> {
        return await this.client.send(GroupsTopics.RESTORE, { id }).toPromise();
    }
}
