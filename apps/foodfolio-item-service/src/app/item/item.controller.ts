import { Controller } from '@nestjs/common';
import { ItemService } from './item.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FoodfolioProductTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Controller('item')
export class ItemController {
    constructor(private readonly service: ItemService) {}

    @MessagePattern(FoodfolioProductTopics.LIST)
    async getItemList(
        @Payload('limit') limit: number,
        @Payload('offset') offset: number,
    ) {
        try {
            //
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.LIST)
    async getItemByCategoryId(
        @Payload('category_id') category_id: Nullable<string>,
    ) {
        try {
            //
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.LIST)
    async getItemByLocationId(
        @Payload('location_id') location_id: Nullable<string>,
    ) {
        try {
            //
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.LIST)
    async getItemByCompanyId(
        @Payload('company_id') company_id: Nullable<string>,
    ) {
        try {
            //
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.LIST)
    async getItemBySizeId(@Payload('size_id') size_id: Nullable<string>) {
        try {
            //
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.LIST)
    async getItemByTypeId(@Payload('type_id') type_id: Nullable<string>) {
        try {
            //
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.LIST)
    async getItemByWarehouseId(
        @Payload('warehouse_id') warehouse_id: Nullable<string>,
    ) {
        try {
            //
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.ID)
    async getItemById(@Payload('id') id: string) {
        try {
            //
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.CREATE)
    async createProduct(@Payload('title') title: string) {
        try {
            //
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.UPDATE)
    async updateProduct(
        @Payload('id') id: string,
        @Payload('title') title?: Optional<string>,
    ) {
        try {
            //
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.DELETE)
    async deleteProduct(@Payload('id') id: string) {
        try {
            //
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.RESTORE)
    async restoreProduct(@Payload('id') id: string) {
        try {
            //
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
