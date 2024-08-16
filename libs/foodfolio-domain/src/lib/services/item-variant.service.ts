import { ItemVariantAnemic } from '../anemics';
import { ItemVariantFactory } from '../factories';
import { ItemVariantRepository } from '../repositories';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { GenericErrorCodes } from '@toxictoast/azkaban-base-helpers';
import { ItemVariantData } from '../data';

export class ItemVariantService {
	private readonly factory: ItemVariantFactory = new ItemVariantFactory();

	constructor(private readonly repository: ItemVariantRepository) {}

	private async save(
		anemic: ItemVariantAnemic,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<ItemVariantAnemic>(result);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async getItemVariants(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Result<Array<ItemVariantAnemic>>> {
		try {
			const result = await this.repository.findList(limit, offset);
			return Result.ok<Array<ItemVariantAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<ItemVariantAnemic>>(error);
		}
	}

	async getItemVariantById(id: string): Promise<Result<ItemVariantAnemic>> {
		try {
			const result = await this.repository.findById(id);
			if (result !== null) {
				return Result.ok<ItemVariantAnemic>(result);
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async getItemVariantByItemId(
		item_id: string,
	): Promise<Result<Array<ItemVariantAnemic>>> {
		try {
			const result = await this.repository.findByItemId(item_id);
			if (result !== null) {
				return Result.ok<Array<ItemVariantAnemic>>(result);
			}
			return Result.fail<Array<ItemVariantAnemic>>(
				GenericErrorCodes.NOT_FOUND,
			);
		} catch (error) {
			return Result.fail<Array<ItemVariantAnemic>>(error);
		}
	}

	async getItemVariantByCategoryId(
		category_id: Nullable<string>,
	): Promise<Result<Array<ItemVariantAnemic>>> {
		try {
			const result = await this.repository.findByCategoryId(category_id);
			return Result.ok<Array<ItemVariantAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<ItemVariantAnemic>>(error);
		}
	}

	async getItemVariantByLocationId(
		location_id: Nullable<string>,
	): Promise<Result<Array<ItemVariantAnemic>>> {
		try {
			const result = await this.repository.findByLocationId(location_id);
			return Result.ok<Array<ItemVariantAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<ItemVariantAnemic>>(error);
		}
	}

	async getItemVariantByCompanyId(
		company_id: Nullable<string>,
	): Promise<Result<Array<ItemVariantAnemic>>> {
		try {
			const result = await this.repository.findByCompanyId(company_id);
			return Result.ok<Array<ItemVariantAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<ItemVariantAnemic>>(error);
		}
	}

	async getItemVariantBySizeId(
		size_id: Nullable<string>,
	): Promise<Result<Array<ItemVariantAnemic>>> {
		try {
			const result = await this.repository.findBySizeId(size_id);
			return Result.ok<Array<ItemVariantAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<ItemVariantAnemic>>(error);
		}
	}

	async getItemVariantByTypeId(
		type_id: Nullable<string>,
	): Promise<Result<Array<ItemVariantAnemic>>> {
		try {
			const result = await this.repository.findByTypeId(type_id);
			return Result.ok<Array<ItemVariantAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<ItemVariantAnemic>>(error);
		}
	}

	async getItemVariantByWarehouseId(
		warehouse_id: Nullable<string>,
	): Promise<Result<Array<ItemVariantAnemic>>> {
		try {
			const result =
				await this.repository.findByWarehouseId(warehouse_id);
			return Result.ok<Array<ItemVariantAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<ItemVariantAnemic>>(error);
		}
	}

	async createItemVariant(
		data: ItemVariantData,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const aggregate = this.factory.createDomain(data);
			return await this.save(aggregate.toAnemic());
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async deleteItemVariant(id: string): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.delete();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async restoreItemVariant(id: string): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.restore();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async updateItemId(
		id: string,
		item_id: Nullable<string>,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeItemId(item_id);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async updateCategoryId(
		id: string,
		category_id: Nullable<string>,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeCategoryId(category_id);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async updateLocationId(
		id: string,
		location_id: Nullable<string>,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeLocationId(location_id);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async updateCompanyId(
		id: string,
		company_id: Nullable<string>,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeCompanyId(company_id);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async updateSizeId(
		id: string,
		size_id: Nullable<string>,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeSizeId(size_id);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async updateTypeId(
		id: string,
		type_id: Nullable<string>,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeTypeId(type_id);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async updateWarehouseId(
		id: string,
		warehouse_id: Nullable<string>,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeWarehouseId(warehouse_id);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async updateTitle(
		id: string,
		title: string,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeTitle(title);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async updateSku(
		id: string,
		sku: number,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeSku(sku);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async updateEan(
		id: string,
		ean: Nullable<string>,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeEan(ean);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async updatePrice(
		id: string,
		price: Nullable<number>,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changePrice(price);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}

	async updateActivatedAt(
		id: string,
		activated_at: Nullable<Date>,
	): Promise<Result<ItemVariantAnemic>> {
		try {
			const item = await this.getItemVariantById(id);
			if (item.isSuccess) {
				const itemValue = item.value;
				const aggregate = this.factory.reconstitute(itemValue);
				aggregate.changeActivatedAt(activated_at);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ItemVariantAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ItemVariantAnemic>(error);
		}
	}
}
