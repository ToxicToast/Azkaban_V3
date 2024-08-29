import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { ShoppingListDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioShoppinglistTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { CachingService } from '../../core/caching.service';

@Injectable()
export class ShoppingListService {
	constructor(
		@Inject('SHOPPINGLIST_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getShoppingLists(
		limit: number,
		offset: number,
	): Promise<Array<ShoppingListDAO>> {
		const cacheKey = `${FoodfolioShoppinglistTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ limit, offset }).build();
			const data = await this.client
				.send(FoodfolioShoppinglistTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getShoppingListById(id: string): Promise<ShoppingListDAO> {
		const cacheKey = `${FoodfolioShoppinglistTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ id }).build();
			const data = await this.client
				.send(FoodfolioShoppinglistTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getShoppingListByItemId(item_id: string): Promise<ShoppingListDAO> {
		const cacheKey = `${FoodfolioShoppinglistTopics.ITEMID}:${item_id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ item_id }).build();
			const data = await this.client
				.send(FoodfolioShoppinglistTopics.ITEMID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createShoppingList(
		item_id: string,
		variant_id: string,
		current_sku: number,
		min_sku: number,
		max_sku: number,
	): Promise<ShoppingListDAO> {
		return await this.client
			.send(FoodfolioShoppinglistTopics.CREATE, {
				item_id,
				variant_id,
				current_sku,
				min_sku,
				max_sku,
			})
			.toPromise()
			.then(async (value) => {
				await this.notifySerivce.onCreateShoppingList(
					value.id,
					value.item_id,
					value.variant_id,
				);
				await this.cachingService.removeCache(
					`${FoodfolioShoppinglistTopics.LIST}:0:0`,
				);
				return value;
			});
	}

	async deleteShoppingList(id: string): Promise<ShoppingListDAO> {
		return await this.client
			.send(FoodfolioShoppinglistTopics.DELETE, { id })
			.toPromise();
	}

	async restoreShoppingList(id: string): Promise<ShoppingListDAO> {
		return await this.client
			.send(FoodfolioShoppinglistTopics.RESTORE, { id })
			.toPromise();
	}
}
