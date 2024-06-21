import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FoodfolioCategoryTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly service: CategoryService) {}

    @MessagePattern(FoodfolioCategoryTopics.LIST)
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

    @MessagePattern(FoodfolioCategoryTopics.PARENT)
    async getCategoryByParentId(
        @Payload('parent_id') parentId: Nullable<string>,
    ) {
        try {
            return await this.service.getByParentId(parentId);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioCategoryTopics.ID)
    async getCategoryById(@Payload('id') id: string) {
        try {
            return await this.service.getById(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioCategoryTopics.CREATE)
    async createCategory(
        @Payload('title') title: string,
        @Payload('parent_id') parent_id?: Optional<string>,
    ) {
        try {
            return await this.createCategory(title, parent_id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioCategoryTopics.UPDATE)
    async updateCategory(
        @Payload('id') id: string,
        @Payload('title') title?: Optional<string>,
        @Payload('parent_id') parent_id?: Optional<string>,
        @Payload('activated_at') activated_at?: Optional<Nullable<Date>>,
    ) {
        try {
            return await this.service.updateCategory(
                id,
                title,
                parent_id,
                activated_at,
            );
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioCategoryTopics.DELETE)
    async deleteCategory(@Payload('id') id: string) {
        try {
            return await this.service.deleteCategory(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioCategoryTopics.RESTORE)
    async restoreCategory(@Payload('id') id: string) {
        try {
            return await this.service.restoreCategory(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
