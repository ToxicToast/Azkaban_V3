import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { ItemVariantDAO } from '@azkaban/foodfolio-infrastructure';
import {
	FoodfolioProductDetailTopics,
	FoodfolioProductVariantTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CachingService } from '../../core/caching.service';

@Injectable()
export class ItemVariantService {
	constructor(
		@Inject('ITEM_VARIANT_SERVICE') private readonly client: ClientProxy,
		@Inject('ITEM_DETAIL_SERVICE')
		private readonly detailClient: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getItemVariants(
		limit: number,
		offset: number,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ limit, offset }).build();
			const data = await this.client
				.send(FoodfolioProductVariantTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getItemVariantByItemId(
		item_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.ITEMID}:${item_id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ item_id }).build();
			const data = await this.client
				.send(FoodfolioProductVariantTopics.ITEMID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getItemVariantByCategoryId(
		category_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.CATEGORYID}:${category_id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ category_id }).build();
			const data = await this.client
				.send(FoodfolioProductVariantTopics.CATEGORYID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getItemVariantByLocationId(
		location_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.LOCATIONID}:${location_id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ location_id }).build();
			const data = await this.client
				.send(FoodfolioProductVariantTopics.LOCATIONID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getItemVariantByCompanyId(
		company_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.COMPANYID}:${company_id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ company_id }).build();
			const data = await this.client
				.send(FoodfolioProductVariantTopics.COMPANYID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getItemVariantBySizeId(
		size_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.SIZEID}:${size_id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ size_id }).build();
			const data = await this.client
				.send(FoodfolioProductVariantTopics.SIZEID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getItemVariantByTypeId(
		type_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.TYPEID}:${type_id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ type_id }).build();
			const data = await this.client
				.send(FoodfolioProductVariantTopics.TYPEID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getItemVariantByWarehouseId(
		warehouse_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const cacheKey = `${FoodfolioProductVariantTopics.WAREHOUSEID}:${warehouse_id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ warehouse_id }).build();
			const data = await this.client
				.send(FoodfolioProductVariantTopics.WAREHOUSEID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getItemVariantById(id: string): Promise<ItemVariantDAO> {
		const cacheKey = `${FoodfolioProductVariantTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ id }).build();
			const data = await this.client
				.send(FoodfolioProductVariantTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
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
				await this.createItemVariantDetailBySku(
					value.id,
					value.sku ?? 0,
				);
				await this.cachingService.removeCache(
					`${FoodfolioProductVariantTopics.LIST}:0:0`,
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
		for (let i = 0; i < sku; i++) {
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
