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
            return await this.service.getList(limit, offset);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.CATEGORYID)
    async getItemByCategoryId(
        @Payload('category_id') category_id: Nullable<string>,
    ) {
        try {
            return await this.service.getByCategoryId(category_id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.LOCATIONID)
    async getItemByLocationId(
        @Payload('location_id') location_id: Nullable<string>,
    ) {
        try {
            return await this.service.getByLocationId(location_id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.COMPANYID)
    async getItemByCompanyId(
        @Payload('company_id') company_id: Nullable<string>,
    ) {
        try {
            return await this.service.getByCompanyId(company_id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.SIZEID)
    async getItemBySizeId(@Payload('size_id') size_id: Nullable<string>) {
        try {
            return await this.service.getBySizeId(size_id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.TYPEID)
    async getItemByTypeId(@Payload('type_id') type_id: Nullable<string>) {
        try {
            return await this.service.getByTypeId(type_id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.WAREHOUSEID)
    async getItemByWarehouseId(
        @Payload('warehouse_id') warehouse_id: Nullable<string>,
    ) {
        try {
            return await this.getItemByWarehouseId(warehouse_id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.ID)
    async getItemById(@Payload('id') id: string) {
        try {
            return await this.getItemById(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.CREATE)
    async createProduct(
        @Payload('category_id') category_id: Nullable<string>,
        @Payload('location_id') location_id: Nullable<string>,
        @Payload('company_id') company_id: Nullable<string>,
        @Payload('size_id') size_id: Nullable<string>,
        @Payload('type_id') type_id: Nullable<string>,
        @Payload('warehouse_id') warehouse_id: Nullable<string>,
        @Payload('title') title: string,
        @Payload('current_sku') current_sku: number,
        @Payload('min_sku') min_sku: number,
        @Payload('max_sku') max_sku: number,
        @Payload('ean') ean: Nullable<string>,
        @Payload('price') price: Nullable<number>,
    ) {
        try {
            return await this.service.createItem(
                category_id,
                location_id,
                company_id,
                size_id,
                type_id,
                warehouse_id,
                title,
                current_sku,
                min_sku,
                max_sku,
                ean,
                price,
            );
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.UPDATE)
    async updateProduct(
        @Payload('id') id: string,
        @Payload('category_id') category_id?: Optional<Nullable<string>>,
        @Payload('location_id') location_id?: Optional<Nullable<string>>,
        @Payload('company_id') company_id?: Optional<Nullable<string>>,
        @Payload('size_id') size_id?: Optional<Nullable<string>>,
        @Payload('type_id') type_id?: Optional<Nullable<string>>,
        @Payload('warehouse_id') warehouse_id?: Optional<Nullable<string>>,
        @Payload('title') title?: Optional<string>,
        @Payload('current_sku') current_sku?: Optional<number>,
        @Payload('min_sku') min_sku?: Optional<number>,
        @Payload('max_sku') max_sku?: Optional<number>,
        @Payload('ean') ean?: Optional<Nullable<string>>,
        @Payload('price') price?: Optional<Nullable<number>>,
        @Payload('activated_at') activated_at?: Optional<Date>,
    ) {
        try {
            return await this.service.updateItem(
                id,
                category_id,
                location_id,
                company_id,
                size_id,
                type_id,
                warehouse_id,
                title,
                current_sku,
                min_sku,
                max_sku,
                ean,
                price,
                activated_at,
            );
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.DELETE)
    async deleteProduct(@Payload('id') id: string) {
        try {
            return await this.service.deleteItem(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioProductTopics.RESTORE)
    async restoreProduct(@Payload('id') id: string) {
        try {
            return await this.service.restoreItem(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
