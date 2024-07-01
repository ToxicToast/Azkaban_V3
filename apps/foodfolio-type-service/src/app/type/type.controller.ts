import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FoodfolioTypeTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
    constructor(private readonly service: TypeService) {}

    @MessagePattern(FoodfolioTypeTopics.LIST)
    async getTypeList(
        @Payload('limit') limit: number,
        @Payload('offset') offset: number,
    ) {
        try {
            return await this.service.getList(limit, offset);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioTypeTopics.ID)
    async getTypeById(@Payload('id') id: string) {
        try {
            return await this.service.getById(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioTypeTopics.CREATE)
    async createType(@Payload('title') title: string) {
        try {
            return await this.service.createType(title);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioTypeTopics.UPDATE)
    async updateType(
        @Payload('id') id: string,
        @Payload('title') title?: Optional<string>,
        @Payload('activated_at') activated_at?: Optional<Nullable<Date>>,
    ) {
        try {
            return await this.service.updateType(id, title, activated_at);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioTypeTopics.DELETE)
    async deleteType(@Payload('id') id: string) {
        try {
            return await this.service.deleteType(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioTypeTopics.RESTORE)
    async restoreType(@Payload('id') id: string) {
        try {
            return await this.service.restoreType(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
