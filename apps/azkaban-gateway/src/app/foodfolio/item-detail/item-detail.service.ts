import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { ItemDetailDAO } from '@azkaban/foodfolio-infrastructure';
import {
	FoodfolioProductDetailTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CachingService } from '../../core/caching.service';

@Injectable()
export class ItemDetailService {
	constructor(
		@Inject('ITEM_DETAIL_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getItemDetails(
		limit: number,
		offset: number,
	): Promise<Array<ItemDetailDAO>> {
		const cacheKey = `${FoodfolioProductDetailTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				limit,
				offset,
			});
			const data = await this.client
				.send(FoodfolioProductDetailTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getItemDetailByItemId(
		item_id: Nullable<string>,
	): Promise<Array<ItemDetailDAO>> {
		const cacheKey = `${FoodfolioProductDetailTopics.ITEMID}:${item_id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				item_id,
			});
			const data = await this.client
				.send(FoodfolioProductDetailTopics.ITEMID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getItemDetailById(id: string): Promise<ItemDetailDAO> {
		const cacheKey = `${FoodfolioProductDetailTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				id,
			});
			const data = await this.client
				.send(FoodfolioProductDetailTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createItemDetail(
		item_id: string,
		purchase_date: Date,
		expiration_date: Nullable<Date>,
		returnable: boolean,
		art_no: Nullable<string>,
	): Promise<ItemDetailDAO> {
		const payload = RmqRecordBuilderHelper({
			item_id,
			purchase_date,
			expiration_date,
			returnable,
			art_no,
		});
		return await this.client
			.send(FoodfolioProductDetailTopics.CREATE, payload)
			.toPromise()
			.then(async (value) => {
				await this.notifySerivce.onCreateItemDetail(
					value.id,
					value.item_id,
				);
				await this.cachingService.removeCache(
					`${FoodfolioProductDetailTopics.LIST}:0:0`,
				);
				return value;
			});
	}

	async updateItemDetail(
		id: string,
		item_id?: Optional<string>,
		purchase_date?: Optional<Date>,
		expiration_date?: Optional<Nullable<Date>>,
		opening_date?: Optional<Nullable<Date>>,
		returnable?: Optional<boolean>,
		activated_at?: Optional<Nullable<Date>>,
		art_no?: Optional<Nullable<string>>,
	): Promise<ItemDetailDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
			item_id,
			purchase_date,
			expiration_date,
			opening_date,
			returnable,
			activated_at,
			art_no,
		});
		return await this.client
			.send(FoodfolioProductDetailTopics.UPDATE, payload)
			.toPromise();
	}

	async deleteItemDetail(id: string): Promise<ItemDetailDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(FoodfolioProductDetailTopics.DELETE, payload)
			.toPromise();
	}

	async restoreItemDetail(id: string): Promise<ItemDetailDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(FoodfolioProductDetailTopics.RESTORE, payload)
			.toPromise();
	}
}
