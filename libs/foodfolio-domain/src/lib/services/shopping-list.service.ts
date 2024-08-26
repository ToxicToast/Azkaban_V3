import { Result } from '@toxictoast/azkaban-base-domain';
import { Optional } from '@toxictoast/azkaban-base-types';
import { ShoppingListFactory } from '../factories';
import { ShoppingListRepository } from '../repositories';
import { ShoppingListAnemic } from '../anemics';
import { ShoppingListData } from '../data';
import { GenericErrorCodes } from '@toxictoast/azkaban-base-helpers';

export class ShoppingListService {
	private readonly factory: ShoppingListFactory = new ShoppingListFactory();

	constructor(private readonly repository: ShoppingListRepository) {}

	private async save(
		anemic: ShoppingListAnemic,
	): Promise<Result<ShoppingListAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<ShoppingListAnemic>(result);
		} catch (error) {
			return Result.fail<ShoppingListAnemic>(error);
		}
	}

	async getShoppingList(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Result<Array<ShoppingListAnemic>>> {
		try {
			const result = await this.repository.findList(limit, offset);
			return Result.ok<Array<ShoppingListAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<ShoppingListAnemic>>(error);
		}
	}

	async getShoppingListById(id: string): Promise<Result<ShoppingListAnemic>> {
		try {
			const result = await this.repository.findById(id);
			return Result.ok<ShoppingListAnemic>(result);
		} catch (error) {
			return Result.fail<ShoppingListAnemic>(error);
		}
	}

	async getShoppingListByItemId(
		item_id: string,
	): Promise<Result<Array<ShoppingListAnemic>>> {
		try {
			const result = await this.repository.findByItemId(item_id);
			return Result.ok<Array<ShoppingListAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<ShoppingListAnemic>>(error);
		}
	}

	async createShoppingList(
		data: ShoppingListData,
	): Promise<Result<ShoppingListAnemic>> {
		try {
			const aggregate = this.factory.createDomain(data);
			return await this.save(aggregate.toAnemic());
		} catch (error) {
			return Result.fail<ShoppingListAnemic>(error);
		}
	}

	async deleteShoppingList(id: string): Promise<Result<ShoppingListAnemic>> {
		try {
			const shoppinglist = await this.getShoppingListById(id);
			if (shoppinglist.isSuccess) {
				const listValue = shoppinglist.value;
				const aggregate = this.factory.reconstitute(listValue);
				aggregate.delete();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ShoppingListAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a ShoppingListErrorCodes enum
		} catch (error) {
			return Result.fail<ShoppingListAnemic>(error);
		}
	}

	async restoreShoppingList(id: string): Promise<Result<ShoppingListAnemic>> {
		try {
			const shoppinglist = await this.getShoppingListById(id);
			if (shoppinglist.isSuccess) {
				const listValue = shoppinglist.value;
				const aggregate = this.factory.reconstitute(listValue);
				aggregate.restore();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ShoppingListAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a ShoppingListErrorCodes enum
		} catch (error) {
			return Result.fail<ShoppingListAnemic>(error);
		}
	}
}
