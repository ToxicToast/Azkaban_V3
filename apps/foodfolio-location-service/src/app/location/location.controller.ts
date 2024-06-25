import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FoodfolioLocationTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private readonly service: LocationService) {}

    @MessagePattern(FoodfolioLocationTopics.LIST)
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

    @MessagePattern(FoodfolioLocationTopics.PARENT)
    async getCategoryByParentId(
        @Payload('parent_id') parent_id: Nullable<string>,
    ) {
        try {
            return await this.service.getByParentId(parent_id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioLocationTopics.FREEZER)
    async getCategoryByFreezer(@Payload('freezer') freezer: boolean) {
        try {
            return await this.service.getByFreezer(freezer);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioLocationTopics.ID)
    async getCategoryById(@Payload('id') id: string) {
        try {
            return await this.service.getById(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioLocationTopics.CREATE)
    async createCategory(
        @Payload('title') title: string,
        @Payload('parent_id') parent_id: Nullable<string>,
        @Payload('freezer') freezer: boolean,
    ) {
        try {
            return await this.service.createLocation(title, parent_id, freezer);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioLocationTopics.UPDATE)
    async updateCategory(
        @Payload('id') id: string,
        @Payload('title') title?: Optional<string>,
        @Payload('parent_id') parent_id?: Optional<string>,
        @Payload('freezer') freezer?: Optional<boolean>,
        @Payload('activated_at') activated_at?: Optional<Nullable<Date>>,
    ) {
        try {
            return await this.service.updateLocation(
                id,
                title,
                parent_id,
                freezer,
                activated_at,
            );
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioLocationTopics.DELETE)
    async deleteCategory(@Payload('id') id: string) {
        try {
            return await this.service.deleteLocation(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioLocationTopics.RESTORE)
    async restoreCategory(@Payload('id') id: string) {
        try {
            return await this.service.restoreLocation(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
