import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { WarehouseDAO } from '@azkaban/foodfolio-infrastructure';
import {
	FoodfolioWarehouseTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CachingService } from '../../core/caching.service';

@Injectable()
export class WarehouseService {
	constructor(
		@Inject('FOODFOLIO_WAREHOUSE_SERVICE')
		private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getWarehouses(
		limit: number,
		offset: number,
	): Promise<Array<WarehouseDAO>> {
		const cacheKey = `${FoodfolioWarehouseTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				limit,
				offset,
			});
			const data = await this.client
				.send(FoodfolioWarehouseTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getWarehouseById(id: string): Promise<WarehouseDAO> {
		const cacheKey = `${FoodfolioWarehouseTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				id,
			});
			const data = await this.client
				.send(FoodfolioWarehouseTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createWarehouse(title: string): Promise<WarehouseDAO> {
		const payload = RmqRecordBuilderHelper({
			title,
		});
		return await this.client
			.send(FoodfolioWarehouseTopics.CREATE, payload)
			.toPromise()
			.then(async (warehouse) => {
				await this.notifySerivce.onCreateWarehouse(
					warehouse.id,
					warehouse.title,
				);
				await this.cachingService.removeCache(
					`${FoodfolioWarehouseTopics.LIST}:0:0`,
				);
				return warehouse;
			})
			.catch(async (error) => {
				throw error;
			});
	}

	async updateWarehouse(
		id: string,
		title?: Optional<string>,
		activated_at?: Optional<Nullable<Date>>,
	): Promise<WarehouseDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
			title,
			activated_at,
		});
		return await this.client
			.send(FoodfolioWarehouseTopics.UPDATE, payload)
			.toPromise();
	}

	async deleteWarehouse(id: string): Promise<WarehouseDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(FoodfolioWarehouseTopics.DELETE, payload)
			.toPromise();
	}

	async restoreWarehouse(id: string): Promise<WarehouseDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(FoodfolioWarehouseTopics.RESTORE, payload)
			.toPromise();
	}
}
