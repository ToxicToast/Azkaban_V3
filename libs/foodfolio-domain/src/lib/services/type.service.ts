import { TypeFactory } from '../factories';
import { TypeRepository } from '../repositories';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import {
    FoodFolioCategoryErrorCodes,
    GenericErrorCodes,
} from '@toxictoast/azkaban-base-helpers';
import { TypeAnemic } from '../anemics';
import { TypeData } from '../data';

export class TypeService {
    private readonly factory: TypeFactory = new TypeFactory();

    constructor(private readonly repository: TypeRepository) {}

    private async save(anemic: TypeAnemic): Promise<Result<TypeAnemic>> {
        try {
            const result = await this.repository.save(anemic);
            return Result.ok<TypeAnemic>(result);
        } catch (error) {
            return Result.fail<TypeAnemic>(error);
        }
    }

    async getTypes(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Result<Array<TypeAnemic>>> {
        try {
            const result = await this.repository.findList(limit, offset);
            return Result.ok<Array<TypeAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<TypeAnemic>>(error);
        }
    }

    async getTypeById(id: string): Promise<Result<TypeAnemic>> {
        try {
            const result = await this.repository.findById(id);
            if (result !== null) {
                return Result.ok<TypeAnemic>(result);
            }
            return Result.fail<TypeAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a TypeErrorCodes enum
        } catch (error) {
            return Result.fail<TypeAnemic>(error);
        }
    }

    async createType(data: TypeData): Promise<Result<TypeAnemic>> {
        try {
            const aggregate = this.factory.createDomain(data);
            return await this.save(aggregate.toAnemic());
        } catch (error) {
            return Result.fail<TypeAnemic>(error);
        }
    }

    async deleteType(id: string): Promise<Result<TypeAnemic>> {
        try {
            const company = await this.getTypeById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.delete();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<TypeAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a TypeErrorCodes enum
        } catch (error) {
            return Result.fail<TypeAnemic>(error);
        }
    }

    async restoreType(id: string): Promise<Result<TypeAnemic>> {
        try {
            const company = await this.getTypeById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.restore();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<TypeAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a TypeErrorCodes enum
        } catch (error) {
            return Result.fail<TypeAnemic>(error);
        }
    }

    async updateTitle(id: string, title: string): Promise<Result<TypeAnemic>> {
        try {
            const company = await this.getTypeById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.changeTitle(title);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<TypeAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<TypeAnemic>(error);
        }
    }

    async updateActivatedAt(
        id: string,
        activated_at: Nullable<Date>,
    ): Promise<Result<TypeAnemic>> {
        try {
            const company = await this.getTypeById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.changeActivatedAt(activated_at);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<TypeAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<TypeAnemic>(error);
        }
    }
}
