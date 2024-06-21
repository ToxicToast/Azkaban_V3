import { CompanyService as DomainService } from '@azkaban/foodfolio-domain';
import { CompanyRepository } from '../repositories';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CompanyDAO } from '../../dao';
import { NotFoundException } from '@nestjs/common';
import { CreateCompanyDTO } from '../../dto';

export class CompanyService {
    private readonly domainService: DomainService;

    constructor(private readonly repository: CompanyRepository) {
        this.domainService = new DomainService(repository);
    }

    async getCompanyList(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Array<CompanyDAO>> {
        const result = await this.domainService.getCompanies(limit, offset);
        if (result.isSuccess) {
            return result.value;
        } else {
            return [];
        }
    }

    async getCompanyById(id: string): Promise<CompanyDAO> {
        const result = await this.domainService.getCompanyById(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async createCompany(data: CreateCompanyDTO): Promise<CompanyDAO> {
        const result = await this.domainService.createCompany(data);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async updateTitle(id: string, title: string): Promise<CompanyDAO> {
        const result = await this.domainService.updateTitle(id, title);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async updateActivatedAt(
        id: string,
        activated_at: Nullable<Date>,
    ): Promise<CompanyDAO> {
        const result = await this.domainService.updateActivatedAt(
            id,
            activated_at,
        );
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async deleteCompany(id: string): Promise<CompanyDAO> {
        const result = await this.domainService.deleteCompany(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async restoreCompany(id: string): Promise<CompanyDAO> {
        const result = await this.domainService.restoreCompany(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }
}
