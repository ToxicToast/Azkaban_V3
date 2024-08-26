import { ShoppingListService as DomainService } from '@azkaban/foodfolio-domain';
import { ShoppingListRepository } from '../repositories';
import { Optional } from '@toxictoast/azkaban-base-types';
import { ShoppingListDAO } from '../../dao';
import { NotFoundException } from '@nestjs/common';
import { CreateShoppingListDTO } from '../../dto';

export class ShoppingListService {
	private readonly domainService: DomainService;

	constructor(private readonly repository: ShoppingListRepository) {
		this.domainService = new DomainService(repository);
	}

	async getShoppingList(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Array<ShoppingListDAO>> {
		const result = await this.domainService.getShoppingList(limit, offset);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getShoppingListById(id: string): Promise<ShoppingListDAO> {
		const result = await this.domainService.getShoppingListById(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getShoppingListByItemId(
		item_id: string,
	): Promise<Array<ShoppingListDAO>> {
		const result =
			await this.domainService.getShoppingListByItemId(item_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async createShoppingList(
		data: CreateShoppingListDTO,
	): Promise<ShoppingListDAO> {
		const result = await this.domainService.createShoppingList(data);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async deleteShoppingList(id: string): Promise<ShoppingListDAO> {
		const result = await this.domainService.deleteShoppingList(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async restoreShoppingList(id: string): Promise<ShoppingListDAO> {
		const result = await this.domainService.restoreShoppingList(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}
}
