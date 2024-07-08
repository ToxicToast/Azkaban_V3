import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GroupsTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Optional } from '@toxictoast/azkaban-base-types';
import { GroupDAO } from '@azkaban/group-infrastructure';
import { NotifyService } from './notify.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class GroupsService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        @Inject('GROUP_SERVICE') private readonly client: ClientProxy,
        private readonly notifySerivce: NotifyService,
    ) {}

    async getGroups(limit: number, offset: number): Promise<Array<GroupDAO>> {
        const cacheKey = `${GroupsTopics.LIST}:${limit}:${offset}`;
        const cachedData =
            await this.cacheManager.get<Array<GroupDAO>>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const data = await this.client
            .send(GroupsTopics.LIST, { limit, offset })
            .toPromise();
        await this.cacheManager.set(cacheKey, data);
        return data;
    }

    async getGroupById(id: string): Promise<GroupDAO> {
        const cacheKey = `${GroupsTopics.ID}:${id}`;
        const cachedData = await this.cacheManager.get<GroupDAO>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const data = await this.client
            .send(GroupsTopics.ID, { id })
            .toPromise();
        await this.cacheManager.set(cacheKey, data);
        return data;
    }

    async createGroup(title: string): Promise<GroupDAO> {
        return await this.client
            .send(GroupsTopics.CREATE, { title })
            .toPromise()
            .then((group) => {
                this.notifySerivce.onCreate(group.id, group.title);
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
