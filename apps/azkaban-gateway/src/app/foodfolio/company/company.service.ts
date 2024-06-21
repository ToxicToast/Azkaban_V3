import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { FoodfolioCompanyTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { CompanyDAO } from '@azkaban/foodfolio-infrastructure';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class CompanyService {
    constructor(
        @Inject('COMPANY_SERVICE') private readonly client: ClientProxy,
        private readonly notifSerivce: NotifyService,
    ) {}

    async getCompanies(
        limit: number,
        offset: number,
    ): Promise<Array<CompanyDAO>> {
        return await this.client
            .send(FoodfolioCompanyTopics.LIST, { limit, offset })
            .toPromise();
    }

    async getCompanyById(id: string): Promise<CompanyDAO> {
        return await this.client
            .send(FoodfolioCompanyTopics.ID, { id })
            .toPromise();
    }

    async createCompany(title: string): Promise<CompanyDAO> {
        return await this.client
            .send(FoodfolioCompanyTopics.CREATE, { title })
            .toPromise()
            .then((company) => {
                this.notifSerivce.onCreateCompany(company.id, company.title);
                return company;
            });
    }

    async updateCompany(
        id: string,
        title?: Optional<string>,
        activated_at?: Optional<Nullable<Date>>,
    ): Promise<CompanyDAO> {
        return await this.client
            .send(FoodfolioCompanyTopics.UPDATE, { id, title, activated_at })
            .toPromise();
    }

    async deleteCompany(id: string): Promise<CompanyDAO> {
        return await this.client
            .send(FoodfolioCompanyTopics.DELETE, { id })
            .toPromise();
    }

    async restoreCompany(id: string): Promise<CompanyDAO> {
        return await this.client
            .send(FoodfolioCompanyTopics.RESTORE, { id })
            .toPromise();
    }
}
