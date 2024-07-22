import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FoodfolioWarehouseTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { WarehouseService } from './warehouse.service';

@Controller('warehouse')
export class WarehouseController {
    constructor(private readonly service: WarehouseService) {}

    @MessagePattern(FoodfolioWarehouseTopics.LIST)
    async getWarehouseList(
        @Payload('limit') limit: number,
        @Payload('offset') offset: number,
    ) {
        try {
            return await this.service.getList(limit, offset);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioWarehouseTopics.ID)
    async getWarehouseById(@Payload('id') id: string) {
        try {
            return await this.service.getById(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioWarehouseTopics.CREATE)
    async createWarehouse(@Payload('title') title: string) {
        try {
            return await this.service.createWarehouse(title);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioWarehouseTopics.UPDATE)
    async updateWarehouse(
        @Payload('id') id: string,
        @Payload('title') title?: Optional<string>,
        @Payload('activated_at') activated_at?: Optional<Nullable<Date>>,
    ) {
        try {
            return await this.service.updateWarehouse(id, title, activated_at);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioWarehouseTopics.DELETE)
    async deleteWarehouse(@Payload('id') id: string) {
        try {
            return await this.service.deleteWarehouse(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioWarehouseTopics.RESTORE)
    async restoreWarehouse(@Payload('id') id: string) {
        try {
            return await this.service.restoreWarehouse(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
