import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { ItemDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioProductTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class MobileService {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		@Inject('ITEM_SERVICE') private readonly client: ClientProxy,
	) {}

	async getFoodfolioItems(limit: number, offset: number) {
		const cacheKey = `${FoodfolioProductTopics.LIST}:${limit}:${offset}`;
		const cachedData = await this.getCachedItems<Array<ItemDAO>>(cacheKey);
		if (cachedData) {
			return cachedData.filter((item: ItemDAO) => item.isActive);
		} else {
			const data = await this.client
				.send(FoodfolioProductTopics.LIST, { limit, offset })
				.toPromise();
			await this.setCachedItem<Array<ItemDAO>>(cacheKey, data);
			return data.filter((item: ItemDAO) => item.isActive);
		}
	}

	private async getCachedItems<T>(key: string): Promise<T> {
		return await this.cacheManager.get<T>(key);
	}

	private async setCachedItem<T>(key: string, data: T): Promise<void> {
		await this.cacheManager.set(key, data);
	}
}
