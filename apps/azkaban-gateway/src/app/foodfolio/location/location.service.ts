import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { LocationDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioLocationTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class LocationService {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		@Inject('LOCATION_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
	) {}

	async getLocations(
		limit: number,
		offset: number,
	): Promise<Array<LocationDAO>> {
		const cacheKey = `${FoodfolioLocationTopics.LIST}:${limit}:${offset}`;
		const cachedData =
			await this.cacheManager.get<Array<LocationDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioLocationTopics.LIST, { limit, offset })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getLocationByParentId(
		parent_id: Nullable<string>,
	): Promise<Array<LocationDAO>> {
		const cacheKey = `${FoodfolioLocationTopics.PARENT}:${parent_id}`;
		const cachedData =
			await this.cacheManager.get<Array<LocationDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioLocationTopics.PARENT, { parent_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getLocationByFreezer(freezer: boolean): Promise<Array<LocationDAO>> {
		const cacheKey = `${FoodfolioLocationTopics.FREEZER}:${freezer}`;
		const cachedData =
			await this.cacheManager.get<Array<LocationDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioLocationTopics.FREEZER, { freezer })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getLocationById(id: string): Promise<LocationDAO> {
		const cacheKey = `${FoodfolioLocationTopics.ID}:${id}`;
		const cachedData = await this.cacheManager.get<LocationDAO>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioLocationTopics.ID, { id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async createLocation(
		title: string,
		freezer: boolean,
		parent_id?: Optional<Nullable<string>>,
	): Promise<LocationDAO> {
		return await this.client
			.send(FoodfolioLocationTopics.CREATE, { title, parent_id, freezer })
			.toPromise()
			.then(async (value) => {
				await this.notifySerivce.onCreateLocation(
					value.id,
					value.title,
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
		return await this.client
			.send(FoodfolioLocationTopics.UPDATE, {
				id,
				title,
				parent_id,
				freezer,
				activated_at,
			})
			.toPromise();
	}

	async deleteLocation(id: string): Promise<LocationDAO> {
		return await this.client
			.send(FoodfolioLocationTopics.DELETE, { id })
			.toPromise();
	}

	async restoreLocation(id: string): Promise<LocationDAO> {
		return await this.client
			.send(FoodfolioLocationTopics.RESTORE, { id })
			.toPromise();
	}
}
