import { Inject, Injectable } from '@nestjs/common';
import {
	RmqRecordBuilderHelper,
	UserTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { ClientProxy } from '@nestjs/microservices';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { UserDAO } from '@azkaban/user-infrastructure';
import { CachingService } from '../core/caching.service';

@Injectable()
export class UserService {
	constructor(
		@Inject('USERS_SERVICE') private readonly client: ClientProxy,
		private readonly cachingService: CachingService,
	) {}

	async getUsers(limit: number, offset: number): Promise<Array<UserDAO>> {
		const cacheKey = `${UserTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				limit,
				offset,
			});
			const data = await this.client
				.send(UserTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getUserById(id: string): Promise<UserDAO> {
		const cacheKey = `${UserTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				id,
			});
			const data = await this.client
				.send(UserTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createUser(email: string, username: string, password: string) {
		const payload = RmqRecordBuilderHelper({
			email,
			username,
			password,
		});
		return await this.client
			.send(UserTopics.CREATE, payload)
			.toPromise()
			.then(async (group) => {
				await this.cachingService.removeCache(`${UserTopics.LIST}:0:0`);
				return group;
			})
			.catch(async (error) => {
				throw error;
			});
	}

	async updateUser(
		id: string,
		email?: Optional<string>,
		username?: Optional<string>,
		password?: Optional<string>,
		activation_token?: Optional<string>,
		activated_at?: Optional<Nullable<Date>>,
		banned_at?: Optional<Nullable<Date>>,
	) {
		const payload = RmqRecordBuilderHelper({
			id,
			email,
			username,
			password,
			activation_token,
			activated_at,
			banned_at,
		});
		return await this.client.send(UserTopics.UPDATE, payload).toPromise();
	}

	async deleteUser(id: string) {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client.send(UserTopics.DELETE, payload).toPromise();
	}

	async restoreUser(id: string) {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client.send(UserTopics.RESTORE, payload).toPromise();
	}
}
