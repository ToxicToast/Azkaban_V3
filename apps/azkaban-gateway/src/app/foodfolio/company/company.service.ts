import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { FoodfolioCompanyTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { CompanyDAO } from '@azkaban/foodfolio-infrastructure';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CompanyService {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		@Inject('COMPANY_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
	) {}

	async getCompanies(
		limit: number,
		offset: number,
	): Promise<Array<CompanyDAO>> {
		const cacheKey = `${FoodfolioCompanyTopics.LIST}:${limit}:${offset}`;
		const cachedData =
			await this.cacheManager.get<Array<CompanyDAO>>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioCompanyTopics.LIST, { limit, offset })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async getCompanyById(id: string): Promise<CompanyDAO> {
		const cacheKey = `${FoodfolioCompanyTopics.ID}:${id}`;
		const cachedData = await this.cacheManager.get<CompanyDAO>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
		const data = await this.client
			.send(FoodfolioCompanyTopics.ID, { id })
			.toPromise();
		await this.cacheManager.set(cacheKey, data);
		return data;
	}

	async createCompany(title: string): Promise<CompanyDAO> {
		return await this.client
			.send(FoodfolioCompanyTopics.CREATE, { title })
			.toPromise()
			.then(async (company) => {
				await this.notifySerivce.onCreateCompany(
					company.id,
					company.title,
				);
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
