import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { ItemDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioProductTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class ItemService {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		@Inject('ITEM_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
	) {}

	async getItems(limit: number, offset: number): Promise<Array<ItemDAO>> {
		const cacheKey = `${FoodfolioProductTopics.LIST}:${limit}:${offset}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductTopics.LIST, { limit, offset })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemById(id: string): Promise<ItemDAO> {
		const cacheKey = `${FoodfolioProductTopics.ID}:${id}`;
		const cachedData = await this.cacheManager.get<ItemDAO>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductTopics.ID, { id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async createItem(
		title: string,
		current_sku: number,
		min_sku: number,
		max_sku: number,
	): Promise<ItemDAO> {
		return await this.client
			.send(FoodfolioProductTopics.CREATE, {
				title,
				current_sku,
				min_sku,
				max_sku,
			})
			.toPromise()
			.then(async (value) => {
				await this.notifySerivce.onCreateItem(value.id, value.title);
				return value;
			});
	}

	async updateItem(
		id: string,
		title?: Optional<string>,
		current_sku?: Optional<number>,
		min_sku?: Optional<number>,
		max_sku?: Optional<number>,
		activated_at?: Optional<Nullable<Date>>,
	): Promise<ItemDAO> {
		return await this.client
			.send(FoodfolioProductTopics.UPDATE, {
				id,
				title,
				current_sku,
				min_sku,
				max_sku,
				activated_at,
			})
			.toPromise();
	}

	async deleteItem(id: string): Promise<ItemDAO> {
		return await this.client
			.send(FoodfolioProductTopics.DELETE, { id })
			.toPromise();
	}

	async restoreItem(id: string): Promise<ItemDAO> {
		return await this.client
			.send(FoodfolioProductTopics.RESTORE, { id })
			.toPromise();
	}
}
