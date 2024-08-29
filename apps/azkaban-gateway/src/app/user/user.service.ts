import { Inject, Injectable } from '@nestjs/common';
import { UserTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
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
			const payload = new RmqRecordBuilder({ limit, offset }).build();
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
			const payload = new RmqRecordBuilder({ id }).build();
			const data = await this.client
				.send(UserTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createUser(email: string, username: string, password: string) {
		return await this.client
			.send(UserTopics.CREATE, { email, username, password })
			.toPromise()
			.then(async (group) => {
				await this.cachingService.removeCache(`${UserTopics.LIST}:0:0`);
				return group;
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
		return await this.client
			.send(UserTopics.UPDATE, {
				id,
				email,
				username,
				password,
				activation_token,
				activated_at,
				banned_at,
			})
			.toPromise();
	}

	async deleteUser(id: string) {
		return await this.client.send(UserTopics.DELETE, { id }).toPromise();
	}

	async restoreUser(id: string) {
		return await this.client.send(UserTopics.RESTORE, { id }).toPromise();
	}
}
