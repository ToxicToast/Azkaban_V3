import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { LocationDAO } from '@azkaban/foodfolio-infrastructure';
import {
	FoodfolioLocationTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CachingService } from '../../core/caching.service';

@Injectable()
export class LocationService {
	constructor(
		@Inject('LOCATION_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getLocations(
		limit: number,
		offset: number,
	): Promise<Array<LocationDAO>> {
		const cacheKey = `${FoodfolioLocationTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				limit,
				offset,
			});
			const data = await this.client
				.send(FoodfolioLocationTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getLocationByParentId(
		parent_id: Nullable<string>,
	): Promise<Array<LocationDAO>> {
		const cacheKey = `${FoodfolioLocationTopics.PARENT}:${parent_id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				parent_id,
			});
			const data = await this.client
				.send(FoodfolioLocationTopics.PARENT, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getLocationByFreezer(freezer: boolean): Promise<Array<LocationDAO>> {
		const cacheKey = `${FoodfolioLocationTopics.FREEZER}:${freezer}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				freezer,
			});
			const data = await this.client
				.send(FoodfolioLocationTopics.FREEZER, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getLocationById(id: string): Promise<LocationDAO> {
		const cacheKey = `${FoodfolioLocationTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				id,
			});
			const data = await this.client
				.send(FoodfolioLocationTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createLocation(
		title: string,
		freezer: boolean,
		parent_id?: Optional<Nullable<string>>,
	): Promise<LocationDAO> {
		const payload = RmqRecordBuilderHelper({
			title,
			parent_id,
			freezer,
		});
		return await this.client
			.send(FoodfolioLocationTopics.CREATE, payload)
			.toPromise()
			.then(async (value) => {
				await this.notifySerivce.onCreateLocation(
					value.id,
					value.title,
				);
				await this.cachingService.removeCache(
					`${FoodfolioLocationTopics.LIST}:0:0`,
				);
				return value;
			});
	}

	async updateLocation(
		id: string,
		title?: Optional<string>,
		parent_id?: Optional<Nullable<string>>,
		freezer?: Optional<boolean>,
		activated_at?: Optional<Nullable<Date>>,
	): Promise<LocationDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
			title,
			parent_id,
			freezer,
			activated_at,
		});
		return await this.client
			.send(FoodfolioLocationTopics.UPDATE, payload)
			.toPromise();
	}

	async deleteLocation(id: string): Promise<LocationDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(FoodfolioLocationTopics.DELETE, payload)
			.toPromise();
	}

	async restoreLocation(id: string): Promise<LocationDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(FoodfolioLocationTopics.RESTORE, payload)
			.toPromise();
	}
}
