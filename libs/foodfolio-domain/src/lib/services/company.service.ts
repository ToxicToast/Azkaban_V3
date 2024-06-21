import { CompanyFactory } from '../factories';
import { CompanyRepository } from '../repositories';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import {
    FoodFolioCategoryErrorCodes,
    GenericErrorCodes,
} from '@toxictoast/azkaban-base-helpers';
import { CompanyAnemic } from '../anemics';
import { CompanyData } from '../data';

export class CompanyService {
    private readonly factory: CompanyFactory = new CompanyFactory();

    constructor(private readonly repository: CompanyRepository) {}

    private async save(anemic: CompanyAnemic): Promise<Result<CompanyAnemic>> {
        try {
            const result = await this.repository.save(anemic);
            return Result.ok<CompanyAnemic>(result);
        } catch (error) {
            return Result.fail<CompanyAnemic>(error);
        }
    }

    async getCompanies(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Result<Array<CompanyAnemic>>> {
        try {
            const result = await this.repository.findList(limit, offset);
            return Result.ok<Array<CompanyAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<CompanyAnemic>>(error);
        }
    }

    async getCompanyById(id: string): Promise<Result<CompanyAnemic>> {
        try {
            const result = await this.repository.findById(id);
            if (result !== null) {
                return Result.ok<CompanyAnemic>(result);
            }
            return Result.fail<CompanyAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a CompanyErrorCodes enum
        } catch (error) {
            return Result.fail<CompanyAnemic>(error);
        }
    }

    async createCompany(data: CompanyData): Promise<Result<CompanyAnemic>> {
        try {
            const aggregate = this.factory.createDomain(data);
            return await this.save(aggregate.toAnemic());
        } catch (error) {
            return Result.fail<CompanyAnemic>(error);
        }
    }

    async deleteCompany(id: string): Promise<Result<CompanyAnemic>> {
        try {
            const company = await this.getCompanyById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.delete();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<CompanyAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a CompanyErrorCodes enum
        } catch (error) {
            return Result.fail<CompanyAnemic>(error);
        }
    }

    async restoreCompany(id: string): Promise<Result<CompanyAnemic>> {
        try {
            const company = await this.getCompanyById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.restore();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<CompanyAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a CompanyErrorCodes enum
        } catch (error) {
            return Result.fail<CompanyAnemic>(error);
        }
    }

    async updateTitle(
        id: string,
        title: string,
    ): Promise<Result<CompanyAnemic>> {
        try {
            const company = await this.getCompanyById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.changeTitle(title);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<CompanyAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<CompanyAnemic>(error);
        }
    }

    async updateActivatedAt(
        id: string,
        activated_at: Nullable<Date>,
    ): Promise<Result<CompanyAnemic>> {
        try {
            const company = await this.getCompanyById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.changeActivatedAt(activated_at);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<CompanyAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<CompanyAnemic>(error);
        }
    }
}
