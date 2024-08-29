import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { SizeDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioSizeTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CachingService } from '../../core/caching.service';

@Injectable()
export class SizeService {
	constructor(
		@Inject('SIZE_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getSizes(limit: number, offset: number): Promise<Array<SizeDAO>> {
		const cacheKey = `${FoodfolioSizeTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ limit, offset }).build();
			const data = await this.client
				.send(FoodfolioSizeTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getSizeById(id: string): Promise<SizeDAO> {
		const cacheKey = `${FoodfolioSizeTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ id }).build();
			const data = await this.client
				.send(FoodfolioSizeTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createSize(title: string): Promise<SizeDAO> {
		return await this.client
			.send(FoodfolioSizeTopics.CREATE, { title })
			.toPromise()
			.then(async (category) => {
				await this.notifySerivce.onCreateSize(
					category.id,
					category.title,
				);
				await this.cachingService.removeCache(
					`${FoodfolioSizeTopics.LIST}:0:0`,
				);
				return category;
			});
	}

	async updateSize(
		id: string,
		title?: Optional<string>,
		activated_at?: Optional<Nullable<Date>>,
	): Promise<SizeDAO> {
		return await this.client
			.send(FoodfolioSizeTopics.UPDATE, {
				id,
				title,
				activated_at,
			})
			.toPromise();
	}

	async deleteSize(id: string): Promise<SizeDAO> {
		return await this.client
			.send(FoodfolioSizeTopics.DELETE, { id })
			.toPromise();
	}

	async restoreSize(id: string): Promise<SizeDAO> {
		return await this.client
			.send(FoodfolioSizeTopics.RESTORE, { id })
			.toPromise();
	}
}
