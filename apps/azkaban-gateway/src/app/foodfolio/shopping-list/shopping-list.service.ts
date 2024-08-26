import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { ShoppingListDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioShoppinglistTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class ShoppingListService {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		@Inject('SHOPPINGLIST_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
	) {}

	async getShoppingLists(
		limit: number,
		offset: number,
	): Promise<Array<ShoppingListDAO>> {
		const cacheKey = `${FoodfolioShoppinglistTopics.LIST}:${limit}:${offset}`;
		const cachedData =
			await this.cacheManager.get<Array<ShoppingListDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioShoppinglistTopics.LIST, { limit, offset })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getShoppingListById(id: string): Promise<ShoppingListDAO> {
		const cacheKey = `${FoodfolioShoppinglistTopics.ID}:${id}`;
		const cachedData =
			await this.cacheManager.get<ShoppingListDAO>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioShoppinglistTopics.ID, { id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getShoppingListByItemId(item_id: string): Promise<ShoppingListDAO> {
		const cacheKey = `${FoodfolioShoppinglistTopics.ITEMID}:${item_id}`;
		const cachedData =
			await this.cacheManager.get<ShoppingListDAO>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioShoppinglistTopics.ITEMID, { item_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
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
