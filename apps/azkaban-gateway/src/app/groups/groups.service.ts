import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	GroupsTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';
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
			const payload = RmqRecordBuilderHelper({
				limit,
				offset,
			});
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
			const payload = RmqRecordBuilderHelper({
				id,
			});
			const data = await this.client
				.send(GroupsTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createGroup(title: string): Promise<GroupDAO> {
		const payload = RmqRecordBuilderHelper({
			title,
		});
		return await this.client
			.send(GroupsTopics.CREATE, payload)
			.toPromise()
			.then(async (group) => {
				await this.notifySerivce.onCreate(group.id, group.title);
				await this.cachingService.removeCache(
					`${GroupsTopics.LIST}:0:0`,
				);
				return group;
			})
			.catch(async (error) => {
				throw error;
			});
	}

	async updateGroup(
		id: string,
		title?: Optional<string>,
		slug?: Optional<string>,
		active?: Optional<boolean>,
	): Promise<GroupDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
			title,
			slug,
			active,
		});
		return await this.client.send(GroupsTopics.UPDATE, payload).toPromise();
	}

	async deleteGroup(id: string): Promise<GroupDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client.send(GroupsTopics.DELETE, payload).toPromise();
	}

	async restoreGroup(id: string): Promise<GroupDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(GroupsTopics.RESTORE, payload)
			.toPromise();
	}
}
