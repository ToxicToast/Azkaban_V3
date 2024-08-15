import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { FoodfolioCategoryTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { CategoryDAO } from '@azkaban/foodfolio-infrastructure';

@Injectable()
export class CategoryService {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		@Inject('CATEGORY_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
	) {}

	async getCategories(
		limit: number,
		offset: number,
	): Promise<Array<CategoryDAO>> {
		const cacheKey = `${FoodfolioCategoryTopics.LIST}:${limit}:${offset}`;
		const cachedData =
			await this.cacheManager.get<Array<CategoryDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioCategoryTopics.LIST, { limit, offset })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getCategoryByParentId(
		parent_id: Nullable<string>,
	): Promise<Array<CategoryDAO>> {
		const cacheKey = `${FoodfolioCategoryTopics.PARENT}:${parent_id}`;
		const cachedData =
			await this.cacheManager.get<Array<CategoryDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioCategoryTopics.PARENT, { parent_id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getCategoryById(id: string): Promise<CategoryDAO> {
		const cacheKey = `${FoodfolioCategoryTopics.ID}:${id}`;
		const cachedData = await this.cacheManager.get<CategoryDAO>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioCategoryTopics.ID, { id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async createCategory(
		title: string,
		parent_id?: Optional<Nullable<string>>,
	): Promise<CategoryDAO> {
		return await this.client
			.send(FoodfolioCategoryTopics.CREATE, { title, parent_id })
			.toPromise()
			.then(async (category) => {
				await this.notifySerivce.onCreateCategory(
					category.id,
					category.title,
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
		return await this.client
			.send(FoodfolioCategoryTopics.UPDATE, {
				id,
				title,
				parent_id,
				activated_at,
			})
			.toPromise();
	}

	async deleteCategory(id: string): Promise<CategoryDAO> {
		return await this.client
			.send(FoodfolioCategoryTopics.DELETE, { id })
			.toPromise();
	}

	async restoreCategory(id: string): Promise<CategoryDAO> {
		return await this.client
			.send(FoodfolioCategoryTopics.RESTORE, { id })
			.toPromise();
	}
}
