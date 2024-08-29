import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { TypeDAO } from '@azkaban/foodfolio-infrastructure';
import {
	FoodfolioTypeTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CachingService } from '../../core/caching.service';

@Injectable()
export class TypeService {
	constructor(
		@Inject('TYPE_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getTypes(limit: number, offset: number): Promise<Array<TypeDAO>> {
		const cacheKey = `${FoodfolioTypeTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				limit,
				offset,
			});
			const data = await this.client
				.send(FoodfolioTypeTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getTypeById(id: string): Promise<TypeDAO> {
		const cacheKey = `${FoodfolioTypeTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				id,
			});
			const data = await this.client
				.send(FoodfolioTypeTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createType(title: string): Promise<TypeDAO> {
		const payload = RmqRecordBuilderHelper({
			title,
		});
		return await this.client
			.send(FoodfolioTypeTopics.CREATE, payload)
			.toPromise()
			.then(async (category) => {
				await this.notifySerivce.onCreateType(
					category.id,
					category.title,
				);
				await this.cachingService.removeCache(
					`${FoodfolioTypeTopics.LIST}:0:0`,
				);
				return category;
			});
	}

	async updateType(
		id: string,
		title?: Optional<string>,
		activated_at?: Optional<Nullable<Date>>,
	): Promise<TypeDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
			title,
			activated_at,
		});
		return await this.client
			.send(FoodfolioTypeTopics.UPDATE, payload)
			.toPromise();
	}

	async deleteType(id: string): Promise<TypeDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(FoodfolioTypeTopics.DELETE, payload)
			.toPromise();
	}

	async restoreType(id: string): Promise<TypeDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(FoodfolioTypeTopics.RESTORE, payload)
			.toPromise();
	}
}
