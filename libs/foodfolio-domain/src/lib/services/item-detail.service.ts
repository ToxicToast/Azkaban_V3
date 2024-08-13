import { ItemDetailAnemic } from '../anemics';
import { ItemDetailFactory } from '../factories';
import { ItemDetailRepository } from '../repositories';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { GenericErrorCodes } from '@toxictoast/azkaban-base-helpers';
import { ItemDetailData } from '../data';

export class ItemDetailService {
	private readonly factory: ItemDetailFactory = new ItemDetailFactory();

	constructor(private readonly repository: ItemDetailRepository) {}

	private async save(
		anemic: ItemDetailAnemic,
	): Promise<Result<ItemDetailAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<ItemDetailAnemic>(result);
		} catch (error) {
			return Result.fail<ItemDetailAnemic>(error);
		}
	}

	async getItemsDetails(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Result<Array<ItemDetailAnemic>>> {
		try {
			const result = await this.repository.findList(limit, offset);
			return Result.ok<Array<ItemDetailAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<ItemDetailAnemic>>(error);
		}
	}

	async getItemDetailByItemId(
		item_id: Nullable<string>,
	): Promise<Result<Array<ItemDetailAnemic>>> {
		try {
			const result = await this.repository.findByItemId(item_id);
			return Result.ok<Array<ItemDetailAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<ItemDetailAnemic>>(error);
		}
	}

	async getItemDetailById(id: string): Promise<Result<ItemDetailAnemic>> {
		try {
			const result = await this.repository.findById(id);
			if (result !== null) {
				return Result.ok<ItemDetailAnemic>(result);
			}
			return Result.fail<ItemDetailAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemDetailAnemic>(error);
		}
	}

	async createItemDetail(
		data: ItemDetailData,
	): Promise<Result<ItemDetailAnemic>> {
		try {
			const aggregate = this.factory.createDomain(data);
			return await this.save(aggregate.toAnemic());
		} catch (error) {
			return Result.fail<ItemDetailAnemic>(error);
		}
	}

	async deleteItemDetail(id: string): Promise<Result<ItemDetailAnemic>> {
		try {
			const item = await this.getItemDetailById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.delete();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemDetailAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemDetailAnemic>(error);
		}
	}

	async restoreItemDetail(id: string): Promise<Result<ItemDetailAnemic>> {
		try {
			const item = await this.getItemDetailById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.restore();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemDetailAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemDetailAnemic>(error);
		}
	}

	async updateItemId(
		id: string,
		item_id: Nullable<string>,
	): Promise<Result<ItemDetailAnemic>> {
		try {
			const item = await this.getItemDetailById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeItemId(item_id);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemDetailAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemDetailAnemic>(error);
		}
	}

	async updateArtNo(
		id: string,
		art_no: Nullable<string>,
	): Promise<Result<ItemDetailAnemic>> {
		try {
			const item = await this.getItemDetailById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeArtNo(art_no);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemDetailAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemDetailAnemic>(error);
		}
	}

	async updatePurchaseDate(
		id: string,
		purchase_date: Date,
	): Promise<Result<ItemDetailAnemic>> {
		try {
			const item = await this.getItemDetailById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changePurchaseDate(purchase_date);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemDetailAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemDetailAnemic>(error);
		}
	}

	async updateExpirationDate(
		id: string,
		expiration_date: Nullable<Date>,
	): Promise<Result<ItemDetailAnemic>> {
		try {
			const item = await this.getItemDetailById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeExpirationDate(expiration_date);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemDetailAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemDetailAnemic>(error);
		}
	}

	async updateOpeningDate(
		id: string,
		opening_date: Nullable<Date>,
	): Promise<Result<ItemDetailAnemic>> {
		try {
			const item = await this.getItemDetailById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeOpeningDate(opening_date);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemDetailAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemDetailAnemic>(error);
		}
	}

	async updateReturnable(
		id: string,
		returnable: boolean,
	): Promise<Result<ItemDetailAnemic>> {
		try {
			const item = await this.getItemDetailById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeReturnable(returnable);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemDetailAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemDetailAnemic>(error);
		}
	}

	async updateActivatedAt(
		id: string,
		activated_at: Nullable<Date>,
	): Promise<Result<ItemDetailAnemic>> {
		try {
			const item = await this.getItemDetailById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeActivatedAt(activated_at);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemDetailAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemDetailAnemic>(error);
		}
	}
}
