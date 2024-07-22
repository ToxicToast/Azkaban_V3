import { WarehouseFactory } from '../factories';
import { WarehouseRepository } from '../repositories';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import {
    FoodFolioCategoryErrorCodes,
    GenericErrorCodes,
} from '@toxictoast/azkaban-base-helpers';
import { WarehouseAnemic } from '../anemics';
import { WarehouseData } from '../data';

export class WarehouseService {
    private readonly factory: WarehouseFactory = new WarehouseFactory();

    constructor(private readonly repository: WarehouseRepository) {}

    private async save(
        anemic: WarehouseAnemic,
    ): Promise<Result<WarehouseAnemic>> {
        try {
            const result = await this.repository.save(anemic);
            return Result.ok<WarehouseAnemic>(result);
        } catch (error) {
            return Result.fail<WarehouseAnemic>(error);
        }
    }

    async getWarehouses(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Result<Array<WarehouseAnemic>>> {
        try {
            const result = await this.repository.findList(limit, offset);
            return Result.ok<Array<WarehouseAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<WarehouseAnemic>>(error);
        }
    }

    async getWarehouseById(id: string): Promise<Result<WarehouseAnemic>> {
        try {
            const result = await this.repository.findById(id);
            if (result !== null) {
                return Result.ok<WarehouseAnemic>(result);
            }
            return Result.fail<WarehouseAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a WarehouseErrorCodes enum
        } catch (error) {
            return Result.fail<WarehouseAnemic>(error);
        }
    }

    async createWarehouse(
        data: WarehouseData,
    ): Promise<Result<WarehouseAnemic>> {
        try {
            const aggregate = this.factory.createDomain(data);
            return await this.save(aggregate.toAnemic());
        } catch (error) {
            return Result.fail<WarehouseAnemic>(error);
        }
    }

    async deleteWarehouse(id: string): Promise<Result<WarehouseAnemic>> {
        try {
            const company = await this.getWarehouseById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.delete();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<WarehouseAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a WarehouseErrorCodes enum
        } catch (error) {
            return Result.fail<WarehouseAnemic>(error);
        }
    }

    async restoreWarehouse(id: string): Promise<Result<WarehouseAnemic>> {
        try {
            const company = await this.getWarehouseById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.restore();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<WarehouseAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a WarehouseErrorCodes enum
        } catch (error) {
            return Result.fail<WarehouseAnemic>(error);
        }
    }

    async updateTitle(
        id: string,
        title: string,
    ): Promise<Result<WarehouseAnemic>> {
        try {
            const company = await this.getWarehouseById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.changeTitle(title);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<WarehouseAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<WarehouseAnemic>(error);
        }
    }

    async updateActivatedAt(
        id: string,
        activated_at: Nullable<Date>,
    ): Promise<Result<WarehouseAnemic>> {
        try {
            const company = await this.getWarehouseById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.changeActivatedAt(activated_at);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<WarehouseAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<WarehouseAnemic>(error);
        }
    }
}
