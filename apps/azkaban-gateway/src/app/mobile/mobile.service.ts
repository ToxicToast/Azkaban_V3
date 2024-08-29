import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { ItemDAO, ItemVariantDAO } from '@azkaban/foodfolio-infrastructure';
import {
	FoodfolioProductTopics,
	FoodfolioProductVariantTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { CachingService } from '../core/caching.service';

@Injectable()
export class MobileService {
	constructor(
		@Inject('ITEM_SERVICE') private readonly clientItem: ClientProxy,
		@Inject('ITEM_VARIANT_SERVICE')
		private readonly clientItemVariant: ClientProxy,
		private readonly cachingService: CachingService,
	) {}

	async getFoodfolioItems(
		limit: number,
		offset: number,
	): Promise<Array<ItemDAO>> {
		const cacheKey = `${FoodfolioProductTopics.LIST}:${limit}:${offset}:active`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ limit, offset }).build();
			const data = await this.clientItem
				.send(FoodfolioProductTopics.LIST, payload)
				.toPromise()
				.then((data) => data.filter((item: ItemDAO) => item.isActive));
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getFoodfolioItemVariants(
		limit: number,
		offset: number,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.LIST}:${limit}:${offset}:active`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ limit, offset }).build();
			const data = await this.clientItemVariant
				.send(FoodfolioProductVariantTopics.LIST, payload)
				.toPromise()
				.then((data: Array<ItemVariantDAO>) =>
					data.filter((item: ItemVariantDAO) => item.isActive),
				);
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}
}
