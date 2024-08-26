import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
	ShoppingListDAO,
	ShoppingListEntity,
	ShoppingListRepository,
	ShoppingListService as BaseService,
} from '@azkaban/foodfolio-infrastructure';

@Injectable()
export class ShoppingListService {
	private readonly infrastructureRepository: ShoppingListRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('SHOPPINGLIST_REPOSITORY')
		private readonly shoppinglistRepository: Repository<ShoppingListEntity>,
	) {
		this.infrastructureRepository = new ShoppingListRepository(
			this.shoppinglistRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

	async getList(
		limit: number,
		offset: number,
	): Promise<Array<ShoppingListDAO>> {
		return await this.infrastructureService.getShoppingList(limit, offset);
	}

	async getShoppingListById(id: string): Promise<ShoppingListDAO> {
		return await this.infrastructureService.getShoppingListById(id);
	}

	async createShoppingList(
		item_id: string,
		variant_id: string,
		current_sku: number,
		min_sku: number,
		max_sku: number,
	): Promise<ShoppingListDAO> {
		return await this.infrastructureService.createShoppingList({
			item_id,
			variant_id,
			current_sku,
			min_sku,
			max_sku,
		});
	}

	async deleteShoppingList(id: string): Promise<ShoppingListDAO> {
		return await this.infrastructureService.deleteShoppingList(id);
	}

	async restoreShoppingList(id: string): Promise<ShoppingListDAO> {
		return await this.infrastructureService.restoreShoppingList(id);
	}
}
