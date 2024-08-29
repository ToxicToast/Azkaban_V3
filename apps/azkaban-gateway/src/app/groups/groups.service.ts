import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { GroupsTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Optional } from '@toxictoast/azkaban-base-types';
import { GroupDAO } from '@azkaban/group-infrastructure';
import { NotifyService } from './notify.service';
import { CachingService } from '../core/caching.service';

@Injectable()
export class GroupsService {
	constructor(
		@Inject('GROUP_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getGroups(limit: number, offset: number): Promise<Array<GroupDAO>> {
		const cacheKey = `${GroupsTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ limit, offset }).build();
			const data = await this.client
				.send(GroupsTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getGroupById(id: string): Promise<GroupDAO> {
		const cacheKey = `${GroupsTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ id }).build();
			const data = await this.client
				.send(GroupsTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createGroup(title: string): Promise<GroupDAO> {
		return await this.client
			.send(GroupsTopics.CREATE, { title })
			.toPromise()
			.then(async (group) => {
				await this.notifySerivce.onCreate(group.id, group.title);
				await this.cachingService.removeCache(
					`${GroupsTopics.LIST}:0:0`,
				);
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
