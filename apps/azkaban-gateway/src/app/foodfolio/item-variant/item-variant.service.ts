import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { ItemVariantDAO } from '@azkaban/foodfolio-infrastructure';
import {
	FoodfolioProductDetailTopics,
	FoodfolioProductVariantTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class ItemVariantService {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		@Inject('ITEM_VARIANT_SERVICE') private readonly client: ClientProxy,
		@Inject('ITEM_DETAIL_SERVICE')
		private readonly detailClient: ClientProxy,
		private readonly notifySerivce: NotifyService,
	) {}

	async getItemVariants(
		limit: number,
		offset: number,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.LIST}:${limit}:${offset}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemVariantDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductVariantTopics.LIST, { limit, offset })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemVariantByItemId(
		item_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.ITEMID}:${item_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemVariantDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductVariantTopics.ITEMID, { item_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemVariantByCategoryId(
		category_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.CATEGORYID}:${category_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemVariantDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductVariantTopics.CATEGORYID, { category_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemVariantByLocationId(
		location_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.LOCATIONID}:${location_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemVariantDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductVariantTopics.LOCATIONID, { location_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemVariantByCompanyId(
		company_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.COMPANYID}:${company_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemVariantDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductVariantTopics.COMPANYID, { company_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemVariantBySizeId(
		size_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.SIZEID}:${size_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemVariantDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductVariantTopics.SIZEID, { size_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemVariantByTypeId(
		type_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.TYPEID}:${type_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemVariantDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductVariantTopics.TYPEID, { type_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemVariantByWarehouseId(
		warehouse_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.WAREHOUSEID}:${warehouse_id}`;
		const cachedData =
			await this.cacheManager.get<Array<ItemVariantDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductVariantTopics.WAREHOUSEID, { warehouse_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getItemVariantById(id: string): Promise<ItemVariantDAO> {
		const cacheKey = `${FoodfolioProductVariantTopics.ID}:${id}`;
		const cachedData =
			await this.cacheManager.get<ItemVariantDAO>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioProductVariantTopics.ID, { id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async createItemVariant(
		item_id: Nullable<string>,
		category_id: Nullable<string>,
		location_id: Nullable<string>,
		company_id: Nullable<string>,
		size_id: Nullable<string>,
		type_id: Nullable<string>,
		warehouse_id: Nullable<string>,
		title: string,
		sku: number,
		ean: Nullable<string>,
		price: Nullable<number>,
	): Promise<ItemVariantDAO> {
		return await this.client
			.send(FoodfolioProductVariantTopics.CREATE, {
				item_id,
				category_id,
				location_id,
				company_id,
				size_id,
				type_id,
				warehouse_id,
				title,
				sku,
				ean,
				price,
			})
			.toPromise()
			.then(async (value) => {
				await this.notifySerivce.onCreateItemVariant(
					value.id,
					value.item_id,
					value.title,
				);
				return value;
			})
			.then(async (value) => {
				await this.createItemVariantDetailBySku(
					value.id,
					value.sku ?? 0,
				);
				return value;
			});
	}

	async updateItemVariant(
		id: string,
		item_id?: Optional<Nullable<string>>,
		category_id?: Optional<Nullable<string>>,
		location_id?: Optional<Nullable<string>>,
		company_id?: Optional<Nullable<string>>,
		size_id?: Optional<Nullable<string>>,
		type_id?: Optional<Nullable<string>>,
		warehouse_id?: Optional<Nullable<string>>,
		title?: Optional<string>,
		sku?: Optional<number>,
		ean?: Optional<Nullable<string>>,
		price?: Optional<Nullable<number>>,
		activated_at?: Optional<Nullable<Date>>,
	): Promise<ItemVariantDAO> {
		return await this.client
			.send(FoodfolioProductVariantTopics.UPDATE, {
				id,
				item_id,
				category_id,
				location_id,
				company_id,
				size_id,
				type_id,
				warehouse_id,
				title,
				sku,
				ean,
				price,
				activated_at,
			})
			.toPromise();
	}

	async deleteItemVariant(id: string): Promise<ItemVariantDAO> {
		return await this.client
			.send(FoodfolioProductVariantTopics.DELETE, { id })
			.toPromise();
	}

	async restoreItemVariant(id: string): Promise<ItemVariantDAO> {
		return await this.client
			.send(FoodfolioProductVariantTopics.RESTORE, { id })
			.toPromise();
	}

	private async createItemVariantDetailBySku(item_id: string, sku: number) {
		const realSku = sku === 0 ? 1 : sku;
		for (let i = 0; i < realSku; i++) {
			await this.detailClient
				.emit(FoodfolioProductDetailTopics.CREATE, {
					item_id,
					purchase_date: new Date(),
					expiration_date: null,
					returnable: false,
					art_no: null,
				})
				.toPromise();
		}
	}
}
