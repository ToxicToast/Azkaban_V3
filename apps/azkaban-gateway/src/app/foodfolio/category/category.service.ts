import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { FoodfolioCategoryTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CategoryDAO } from '@azkaban/foodfolio-infrastructure';
import { CachingService } from '../../core/caching.service';

@Injectable()
export class CategoryService {
	constructor(
		@Inject('CATEGORY_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getCategories(
		limit: number,
		offset: number,
	): Promise<Array<CategoryDAO>> {
		const cacheKey = `${FoodfolioCategoryTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ limit, offset }).build();
			const data = await this.client
				.send(FoodfolioCategoryTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getCategoryByParentId(
		parent_id: Nullable<string>,
	): Promise<Array<CategoryDAO>> {
		const cacheKey = `${FoodfolioCategoryTopics.PARENT}:${parent_id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ parent_id }).build();
			const data = await this.client
				.send(FoodfolioCategoryTopics.PARENT, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getCategoryById(id: string): Promise<CategoryDAO> {
		const cacheKey = `${FoodfolioCategoryTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ id }).build();
			const data = await this.client
				.send(FoodfolioCategoryTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createCategory(
		title: string,
		parent_id?: Optional<Nullable<string>>,
	): Promise<CategoryDAO> {
		const payload = new RmqRecordBuilder({ title, parent_id }).build();
		return await this.client
			.send(FoodfolioCategoryTopics.CREATE, payload)
			.toPromise()
			.then(async (category) => {
				await this.notifySerivce.onCreateCategory(
					category.id,
					category.title,
				);
				await this.cachingService.removeCache(
					`${FoodfolioCategoryTopics.LIST}:0:0`,
				);

				return category;
			});
	}

	async updateCategory(
		id: string,
		title?: Optional<string>,
		parent_id?: Optional<Nullable<string>>,
		activated_at?: Optional<Nullable<Date>>,
	): Promise<CategoryDAO> {
		const payload = new RmqRecordBuilder({
			id,
			title,
			parent_id,
			activated_at,
		}).build();
		return await this.client
			.send(FoodfolioCategoryTopics.UPDATE, payload)
			.toPromise();
	}

	async deleteCategory(id: string): Promise<CategoryDAO> {
		const payload = new RmqRecordBuilder({
			id,
		}).build();
		return await this.client
			.send(FoodfolioCategoryTopics.DELETE, payload)
			.toPromise();
	}

	async restoreCategory(id: string): Promise<CategoryDAO> {
		const payload = new RmqRecordBuilder({
			id,
		}).build();
		return await this.client
			.send(FoodfolioCategoryTopics.RESTORE, payload)
			.toPromise();
	}
}
