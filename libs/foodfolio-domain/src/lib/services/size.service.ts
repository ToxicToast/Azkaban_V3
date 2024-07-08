import { SizeFactory } from '../factories';
import { SizeRepository } from '../repositories';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import {
    FoodFolioCategoryErrorCodes,
    GenericErrorCodes,
} from '@toxictoast/azkaban-base-helpers';
import { SizeAnemic } from '../anemics';
import { SizeData } from '../data';

export class SizeService {
    private readonly factory: SizeFactory = new SizeFactory();

    constructor(private readonly repository: SizeRepository) {}

    private async save(anemic: SizeAnemic): Promise<Result<SizeAnemic>> {
        try {
            const result = await this.repository.save(anemic);
            return Result.ok<SizeAnemic>(result);
        } catch (error) {
            return Result.fail<SizeAnemic>(error);
        }
    }

    async getSizes(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Result<Array<SizeAnemic>>> {
        try {
            const result = await this.repository.findList(limit, offset);
            return Result.ok<Array<SizeAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<SizeAnemic>>(error);
        }
    }

    async getSizeById(id: string): Promise<Result<SizeAnemic>> {
        try {
            const result = await this.repository.findById(id);
            if (result !== null) {
                return Result.ok<SizeAnemic>(result);
            }
            return Result.fail<SizeAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a SizeErrorCodes enum
        } catch (error) {
            return Result.fail<SizeAnemic>(error);
        }
    }

    async createSize(data: SizeData): Promise<Result<SizeAnemic>> {
        try {
            const aggregate = this.factory.createDomain(data);
            return await this.save(aggregate.toAnemic());
        } catch (error) {
            return Result.fail<SizeAnemic>(error);
        }
    }

    async deleteSize(id: string): Promise<Result<SizeAnemic>> {
        try {
            const company = await this.getSizeById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.delete();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<SizeAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a SizeErrorCodes enum
        } catch (error) {
            return Result.fail<SizeAnemic>(error);
        }
    }

    async restoreSize(id: string): Promise<Result<SizeAnemic>> {
        try {
            const company = await this.getSizeById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.restore();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<SizeAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a SizeErrorCodes enum
        } catch (error) {
            return Result.fail<SizeAnemic>(error);
        }
    }

    async updateTitle(id: string, title: string): Promise<Result<SizeAnemic>> {
        try {
            const company = await this.getSizeById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.changeTitle(title);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<SizeAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<SizeAnemic>(error);
        }
    }

    async updateActivatedAt(
        id: string,
        activated_at: Nullable<Date>,
    ): Promise<Result<SizeAnemic>> {
        try {
            const company = await this.getSizeById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.changeActivatedAt(activated_at);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<SizeAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<SizeAnemic>(error);
        }
    }
}
