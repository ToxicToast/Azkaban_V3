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

	async getItemByCategoryId(
		category_id: Nullable<string>,
	): Promise<Array<ItemDAO>> {
		const cacheKey = `${FoodfolioProductTopics.CATEGORYID}:${category_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductTopics.CATEGORYID, { category_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemByLocationId(
		location_id: Nullable<string>,
	): Promise<Array<ItemDAO>> {
		const cacheKey = `${FoodfolioProductTopics.LOCATIONID}:${location_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductTopics.LOCATIONID, { location_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemByCompanyId(
		company_id: Nullable<string>,
	): Promise<Array<ItemDAO>> {
		const cacheKey = `${FoodfolioProductTopics.COMPANYID}:${company_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductTopics.COMPANYID, { company_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemBySizeId(size_id: Nullable<string>): Promise<Array<ItemDAO>> {
		const cacheKey = `${FoodfolioProductTopics.SIZEID}:${size_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductTopics.SIZEID, { size_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemByTypeId(type_id: Nullable<string>): Promise<Array<ItemDAO>> {
		const cacheKey = `${FoodfolioProductTopics.TYPEID}:${type_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductTopics.TYPEID, { type_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemByWarehouseId(
		warehouse_id: Nullable<string>,
	): Promise<Array<ItemDAO>> {
		const cacheKey = `${FoodfolioProductTopics.WAREHOUSEID}:${warehouse_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductTopics.WAREHOUSEID, { warehouse_id })
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
		category_id: Nullable<string>,
		location_id: Nullable<string>,
		company_id: Nullable<string>,
		size_id: Nullable<string>,
		type_id: Nullable<string>,
		warehouse_id: Nullable<string>,
		title: string,
		current_sku: number,
		min_sku: number,
		max_sku: number,
		ean: Nullable<string>,
		price: Nullable<number>,
	): Promise<ItemDAO> {
		return await this.client
			.send(FoodfolioProductTopics.CREATE, {
				category_id,
				location_id,
				company_id,
				size_id,
				type_id,
				warehouse_id,
				title,
				current_sku,
				min_sku,
				max_sku,
				ean,
				price,
			})
			.toPromise()
			.then((value) => {
				this.notifySerivce.onCreateItem(value.id, value.title);
				return value;
			});
	}

	async updateItem(
		id: string,
		category_id?: Optional<Nullable<string>>,
		location_id?: Optional<Nullable<string>>,
		company_id?: Optional<Nullable<string>>,
		size_id?: Optional<Nullable<string>>,
		type_id?: Optional<Nullable<string>>,
		warehouse_id?: Optional<Nullable<string>>,
		title?: Optional<string>,
		current_sku?: Optional<number>,
		min_sku?: Optional<number>,
		max_sku?: Optional<number>,
		ean?: Optional<Nullable<string>>,
		price?: Optional<Nullable<number>>,
		activated_at?: Optional<Nullable<Date>>,
	): Promise<ItemDAO> {
		return await this.client
			.send(FoodfolioProductTopics.UPDATE, {
				id,
				category_id,
				location_id,
				company_id,
				size_id,
				type_id,
				warehouse_id,
				title,
				current_sku,
				min_sku,
				max_sku,
				ean,
				price,
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
