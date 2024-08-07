import { ItemAnemic } from '../anemics';
import { ItemFactory } from '../factories';
import { ItemRepository } from '../repositories';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { GenericErrorCodes } from '@toxictoast/azkaban-base-helpers';
import { ItemData } from '../data';

export class ItemService {
    private readonly factory: ItemFactory = new ItemFactory();

    constructor(private readonly repository: ItemRepository) {}

    private async save(anemic: ItemAnemic): Promise<Result<ItemAnemic>> {
        try {
            const result = await this.repository.save(anemic);
            return Result.ok<ItemAnemic>(result);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async getItems(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Result<Array<ItemAnemic>>> {
        try {
            const result = await this.repository.findList(limit, offset);
            return Result.ok<Array<ItemAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<ItemAnemic>>(error);
        }
    }

    async getItemByCategoryId(
        category_id: Nullable<string>,
    ): Promise<Result<Array<ItemAnemic>>> {
        try {
            const result = await this.repository.findByCategoryId(category_id);
            return Result.ok<Array<ItemAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<ItemAnemic>>(error);
        }
    }

    async getItemByLocationId(
        location_id: Nullable<string>,
    ): Promise<Result<Array<ItemAnemic>>> {
        try {
            const result = await this.repository.findByLocationId(location_id);
            return Result.ok<Array<ItemAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<ItemAnemic>>(error);
        }
    }

    async getItemByCompanyId(
        company_id: Nullable<string>,
    ): Promise<Result<Array<ItemAnemic>>> {
        try {
            const result = await this.repository.findByCompanyId(company_id);
            return Result.ok<Array<ItemAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<ItemAnemic>>(error);
        }
    }

    async getItemBySizeId(
        size_id: Nullable<string>,
    ): Promise<Result<Array<ItemAnemic>>> {
        try {
            const result = await this.repository.findBySizeId(size_id);
            return Result.ok<Array<ItemAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<ItemAnemic>>(error);
        }
    }

    async getItemByTypeId(
        type_id: Nullable<string>,
    ): Promise<Result<Array<ItemAnemic>>> {
        try {
            const result = await this.repository.findByTypeId(type_id);
            return Result.ok<Array<ItemAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<ItemAnemic>>(error);
        }
    }

    async getItemByWarehouseId(
        warehouse_id: Nullable<string>,
    ): Promise<Result<Array<ItemAnemic>>> {
        try {
            const result =
                await this.repository.findByWarehouseId(warehouse_id);
            return Result.ok<Array<ItemAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<ItemAnemic>>(error);
        }
    }

    async getItemById(id: string): Promise<Result<ItemAnemic>> {
        try {
            const result = await this.repository.findById(id);
            if (result !== null) {
                return Result.ok<ItemAnemic>(result);
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async createItem(data: ItemData): Promise<Result<ItemAnemic>> {
        try {
            const aggregate = this.factory.createDomain(data);
            return await this.save(aggregate.toAnemic());
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async deleteItem(id: string): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.delete();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async restoreItem(id: string): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.restore();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updateCategoryId(
        id: string,
        category_id: Nullable<string>,
    ): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changeCategoryId(category_id);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updateLocationId(
        id: string,
        location_id: Nullable<string>,
    ): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changeLocationId(location_id);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updateCompanyId(
        id: string,
        company_id: Nullable<string>,
    ): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changeCompanyId(company_id);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updateSizeId(
        id: string,
        size_id: Nullable<string>,
    ): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changeSizeId(size_id);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updateTypeId(
        id: string,
        type_id: Nullable<string>,
    ): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changeTypeId(type_id);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updateWarehouseId(
        id: string,
        warehouse_id: Nullable<string>,
    ): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changeWarehouseId(warehouse_id);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updateTitle(id: string, title: string): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changeTitle(title);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updateCurrentSku(
        id: string,
        current_sku: number,
    ): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changeCurrentSku(current_sku);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updateMinSku(
        id: string,
        min_sku: number,
    ): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changeMinSku(min_sku);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updateMaxSku(
        id: string,
        max_sku: number,
    ): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changeMaxSku(max_sku);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updateEan(
        id: string,
        ean: Nullable<string>,
    ): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changeEan(ean);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updatePrice(
        id: string,
        price: Nullable<number>,
    ): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changePrice(price);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }

    async updateActivatedAt(
        id: string,
        activated_at: Nullable<Date>,
    ): Promise<Result<ItemAnemic>> {
        try {
            const item = await this.getItemById(id);
            if (item.isSuccess) {
                const itemValue = item.value;
                const aggregate = this.factory.reconstitute(itemValue);
                aggregate.changeActivatedAt(activated_at);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<ItemAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<ItemAnemic>(error);
        }
    }
}
