import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FoodfolioCompanyTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    constructor(private readonly service: CompanyService) {}

    @MessagePattern(FoodfolioCompanyTopics.LIST)
    async getCategoryList(
        @Payload('limit') limit: number,
        @Payload('offset') offset: number,
    ) {
        try {
            return await this.service.getList(limit, offset);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioCompanyTopics.ID)
    async getCategoryById(@Payload('id') id: string) {
        try {
            return await this.service.getById(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioCompanyTopics.CREATE)
    async createCategory(@Payload('title') title: string) {
        try {
            return await this.service.createCompany(title);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioCompanyTopics.UPDATE)
    async updateCategory(
        @Payload('id') id: string,
        @Payload('title') title?: Optional<string>,
        @Payload('activated_at') activated_at?: Optional<Nullable<Date>>,
    ) {
        try {
            return await this.service.updateCompany(id, title, activated_at);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioCompanyTopics.DELETE)
    async deleteCategory(@Payload('id') id: string) {
        try {
            return await this.service.deleteCompany(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioCompanyTopics.RESTORE)
    async restoreCategory(@Payload('id') id: string) {
        try {
            return await this.service.restoreCompany(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
