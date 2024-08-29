import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { FoodfolioCompanyTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { CompanyDAO } from '@azkaban/foodfolio-infrastructure';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CachingService } from '../../core/caching.service';

@Injectable()
export class CompanyService {
	constructor(
		@Inject('COMPANY_SERVICE') private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getCompanies(
		limit: number,
		offset: number,
	): Promise<Array<CompanyDAO>> {
		const cacheKey = `${FoodfolioCompanyTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ limit, offset }).build();
			const data = await this.client
				.send(FoodfolioCompanyTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async getCompanyById(id: string): Promise<CompanyDAO> {
		const cacheKey = `${FoodfolioCompanyTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = new RmqRecordBuilder({ id }).build();
			const data = await this.client
				.send(FoodfolioCompanyTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createCompany(title: string): Promise<CompanyDAO> {
		const payload = new RmqRecordBuilder({ title }).build();
		return await this.client
			.send(FoodfolioCompanyTopics.CREATE, payload)
			.toPromise()
			.then(async (company) => {
				await this.notifySerivce.onCreateCompany(
					company.id,
					company.title,
				);
				await this.cachingService.removeCache(
					`${FoodfolioCompanyTopics.LIST}:0:0`,
				);
				return company;
			});
	}

	async updateCompany(
		id: string,
		title?: Optional<string>,
		activated_at?: Optional<Nullable<Date>>,
	): Promise<CompanyDAO> {
		const payload = new RmqRecordBuilder({
			id,
			title,
			activated_at,
		}).build();
		return await this.client
			.send(FoodfolioCompanyTopics.UPDATE, payload)
			.toPromise();
	}

	async deleteCompany(id: string): Promise<CompanyDAO> {
		const payload = new RmqRecordBuilder({ id }).build();
		return await this.client
			.send(FoodfolioCompanyTopics.DELETE, payload)
			.toPromise();
	}

	async restoreCompany(id: string): Promise<CompanyDAO> {
		const payload = new RmqRecordBuilder({ id }).build();
		return await this.client
			.send(FoodfolioCompanyTopics.RESTORE, payload)
			.toPromise();
	}
}
