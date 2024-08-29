import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { SizeDAO } from '@azkaban/foodfolio-infrastructure';
import {
	FoodfolioSizeTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CachingService } from '../../core/caching.service';

@Injectable()
export class SizeService {
	constructor(
		@Inject('SIZE_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getSizes(limit: number, offset: number): Promise<Array<SizeDAO>> {
		const cacheKey = `${FoodfolioSizeTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				limit,
				offset,
			});
			const data = await this.client
				.send(FoodfolioSizeTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getSizeById(id: string): Promise<SizeDAO> {
		const cacheKey = `${FoodfolioSizeTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				id,
			});
			const data = await this.client
				.send(FoodfolioSizeTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createSize(title: string): Promise<SizeDAO> {
		const payload = RmqRecordBuilderHelper({
			title,
		});
		return await this.client
			.send(FoodfolioSizeTopics.CREATE, payload)
			.toPromise()
			.then(async (category) => {
				await this.notifySerivce.onCreateSize(
					category.id,
					category.title,
				);
				await this.cachingService.removeCache(
					`${FoodfolioSizeTopics.LIST}:0:0`,
				);
				return category;
			});
	}

	async updateSize(
		id: string,
		title?: Optional<string>,
		activated_at?: Optional<Nullable<Date>>,
	): Promise<SizeDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
			title,
			activated_at,
		});
		return await this.client
			.send(FoodfolioSizeTopics.UPDATE, payload)
			.toPromise();
	}

	async deleteSize(id: string): Promise<SizeDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(FoodfolioSizeTopics.DELETE, payload)
			.toPromise();
	}

	async restoreSize(id: string): Promise<SizeDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(FoodfolioSizeTopics.RESTORE, payload)
			.toPromise();
	}
}
