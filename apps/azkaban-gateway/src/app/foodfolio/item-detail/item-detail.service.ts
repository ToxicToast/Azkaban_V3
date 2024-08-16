import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { ItemDetailDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioProductDetailTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class ItemDetailService {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		@Inject('ITEM_DETAIL_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
	) {}

	async getItemDetails(
		limit: number,
		offset: number,
	): Promise<Array<ItemDetailDAO>> {
		const cacheKey = `${FoodfolioProductDetailTopics.LIST}:${limit}:${offset}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemDetailDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductDetailTopics.LIST, { limit, offset })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemDetailByItemId(
		item_id: Nullable<string>,
	): Promise<Array<ItemDetailDAO>> {
		const cacheKey = `${FoodfolioProductDetailTopics.ITEMID}:${item_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemDetailDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductDetailTopics.ITEMID, { item_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemDetailById(id: string): Promise<ItemDetailDAO> {
		const cacheKey = `${FoodfolioProductDetailTopics.ID}:${id}`;
		const cachedData = await this.cacheManager.get<ItemDetailDAO>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductDetailTopics.ID, { id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async createItemDetail(
		item_id: string,
		purchase_date: Date,
		expiration_date: Nullable<Date>,
		returnable: boolean,
		art_no: Nullable<string>,
	): Promise<ItemDetailDAO> {
		return await this.client
			.send(FoodfolioProductDetailTopics.CREATE, {
				item_id,
				purchase_date,
				expiration_date,
				returnable,
				art_no,
			})
			.toPromise()
			.then(async (value) => {
				await this.notifySerivce.onCreateItemDetail(
					value.id,
					value.item_id,
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
		return await this.client
			.send(FoodfolioProductDetailTopics.UPDATE, {
				id,
				item_id,
				purchase_date,
				expiration_date,
				opening_date,
				returnable,
				activated_at,
				art_no,
			})
			.toPromise();
	}

	async deleteItemDetail(id: string): Promise<ItemDetailDAO> {
		return await this.client
			.send(FoodfolioProductDetailTopics.DELETE, { id })
			.toPromise();
	}

	async restoreItemDetail(id: string): Promise<ItemDetailDAO> {
		return await this.client
			.send(FoodfolioProductDetailTopics.RESTORE, { id })
			.toPromise();
	}
}
