import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { ItemDAO, ItemVariantDAO } from '@azkaban/foodfolio-infrastructure';
import {
	FoodfolioProductTopics,
	FoodfolioProductVariantTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class MobileService {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		@Inject('ITEM_SERVICE') private readonly clientItem: ClientProxy,
		@Inject('ITEM_VARIANT_SERVICE')
		private readonly clientItemVariant: ClientProxy,
	) {}

	async getFoodfolioItems(limit: number, offset: number) {
		const topic = FoodfolioProductTopics.LIST;
		const cacheKey = `${topic}:${limit}:${offset}`;
		const cachedData = await this.getCachedItems<Array<ItemDAO>>(cacheKey);
		if (cachedData) {
			return cachedData.filter((item: ItemDAO) => item.isActive);
		} else {
			const data = await this.clientItem
				.send(topic, { limit, offset })
				.toPromise();
			await this.setCachedItem<Array<ItemDAO>>(cacheKey, data);
			return data.filter((item: ItemDAO) => item.isActive);
		}
	}

	async getFoodfolioItemVariants(limit: number, offset: number) {
		const topic = FoodfolioProductVariantTopics.LIST;
		const cacheKey = `${topic}:${limit}:${offset}`;
		const cachedData =
			await this.getCachedItems<Array<ItemVariantDAO>>(cacheKey);
		if (cachedData) {
			return cachedData.filter((item: ItemVariantDAO) => item.isActive);
		} else {
			const data = await this.clientItemVariant
				.send(topic, { limit, offset })
				.toPromise();
			await this.setCachedItem<Array<ItemVariantDAO>>(cacheKey, data);
			return data.filter((item: ItemVariantDAO) => item.isActive);
		}
	}

	private async getCachedItems<T>(key: string): Promise<T> {
		return await this.cacheManager.get<T>(key);
	}

	private async setCachedItem<T>(key: string, data: T): Promise<void> {
		await this.cacheManager.set(key, data);
	}
}
