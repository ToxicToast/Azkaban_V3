import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { ItemDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioProductTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CachingService } from '../../core/caching.service';

@Injectable()
export class ItemService {
	constructor(
		@Inject('ITEM_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getItems(limit: number, offset: number): Promise<Array<ItemDAO>> {
		const cacheKey = `${FoodfolioProductTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ limit, offset }).build();
			const data = await this.client
				.send(FoodfolioProductTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getItemById(id: string): Promise<ItemDAO> {
		const cacheKey = `${FoodfolioProductTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ id }).build();
			const data = await this.client
				.send(FoodfolioProductTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createItem(
		title: string,
		current_sku: number,
		min_sku: number,
		max_sku: number,
	): Promise<ItemDAO> {
		const payload = new RmqRecordBuilder({
			title,
			current_sku,
			min_sku,
			max_sku,
		}).build();
		return await this.client
			.send(FoodfolioProductTopics.CREATE, payload)
			.toPromise()
			.then(async (value) => {
				await this.notifySerivce.onCreateItem(value.id, value.title);
				await this.cachingService.removeCache(
					`${FoodfolioProductTopics.LIST}:0:0`,
				);
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
