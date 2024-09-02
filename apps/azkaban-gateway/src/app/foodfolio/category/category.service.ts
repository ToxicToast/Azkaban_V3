import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import {
	FoodfolioCategoryTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CategoryDAO } from '@azkaban/foodfolio-infrastructure';
import { CachingService } from '../../core/caching.service';

@Injectable()
export class CategoryService {
	constructor(
		@Inject('FOODFOLIO_CATEGORY_SERVICE')
		private readonly client: ClientProxy,
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
			const payload = RmqRecordBuilderHelper({
				limit,
				offset,
			});
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
			const payload = RmqRecordBuilderHelper({
				parent_id,
			});
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
			const payload = RmqRecordBuilderHelper({
				id,
			});
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
		const payload = RmqRecordBuilderHelper({
			title,
			parent_id,
		});
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
			})
			.catch(async (error) => {
				throw error;
			});
	}

	async updateCategory(
		id: string,
		title?: Optional<string>,
		parent_id?: Optional<Nullable<string>>,
		activated_at?: Optional<Nullable<Date>>,
	): Promise<CategoryDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
			title,
			parent_id,
			activated_at,
		});
		return await this.client
			.send(FoodfolioCategoryTopics.UPDATE, payload)
			.toPromise();
	}

	async deleteCategory(id: string): Promise<CategoryDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(FoodfolioCategoryTopics.DELETE, payload)
			.toPromise();
	}

	async restoreCategory(id: string): Promise<CategoryDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(FoodfolioCategoryTopics.RESTORE, payload)
			.toPromise();
	}
}
