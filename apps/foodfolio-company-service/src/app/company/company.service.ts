import { Inject, Injectable } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';
import {
    CompanyDAO,
    CompanyEntity,
    CompanyRepository,
    CompanyService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    private readonly infrastructureRepository: CompanyRepository;
    private readonly infrastructureService: BaseService;

    constructor(
        @Inject('COMPANY_REPOSITORY')
        private readonly companyRepository: Repository<CompanyEntity>,
    ) {
        this.infrastructureRepository = new CompanyRepository(
            this.companyRepository,
        );
        this.infrastructureService = new BaseService(
            this.infrastructureRepository,
        );
    }

    async getList(limit: number, offset: number): Promise<Array<CompanyDAO>> {
        return await this.infrastructureService.getCompanyList(limit, offset);
    }

    async getById(id: string): Promise<CompanyDAO> {
        return await this.infrastructureService.getCompanyById(id);
    }

    async createCompany(title: string): Promise<CompanyDAO> {
        return await this.infrastructureService.createCompany({
            title,
        });
    }

    async updateCompany(
        id: string,
        title?: Optional<string>,
        activated_at?: Optional<Date>,
    ): Promise<CompanyDAO> {
        if (title !== undefined) {
            await this.infrastructureService.updateTitle(id, title);
        }
        if (activated_at !== undefined) {
            await this.infrastructureService.updateActivatedAt(
                id,
                activated_at,
            );
        }
        return await this.infrastructureService.getCompanyById(id);
    }

    async deleteCompany(id: string): Promise<CompanyDAO> {
        return await this.infrastructureService.deleteCompany(id);
    }

    async restoreCompany(id: string): Promise<CompanyDAO> {
        return await this.infrastructureService.restoreCompany(id);
    }
}
