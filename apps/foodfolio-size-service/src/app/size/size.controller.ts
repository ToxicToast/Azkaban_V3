import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FoodfolioSizeTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { SizeService } from './size.service';

@Controller('size')
export class SizeController {
    constructor(private readonly service: SizeService) {}

    @MessagePattern(FoodfolioSizeTopics.LIST)
    async getSizeList(
        @Payload('limit') limit: number,
        @Payload('offset') offset: number,
    ) {
        try {
            return await this.service.getList(limit, offset);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioSizeTopics.ID)
    async getSizeById(@Payload('id') id: string) {
        try {
            return await this.service.getById(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioSizeTopics.CREATE)
    async createSize(@Payload('title') title: string) {
        try {
            return await this.service.createSize(title);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioSizeTopics.UPDATE)
    async updateSize(
        @Payload('id') id: string,
        @Payload('title') title?: Optional<string>,
        @Payload('activated_at') activated_at?: Optional<Nullable<Date>>,
    ) {
        try {
            return await this.service.updateSize(id, title, activated_at);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioSizeTopics.DELETE)
    async deleteSize(@Payload('id') id: string) {
        try {
            return await this.service.deleteSize(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(FoodfolioSizeTopics.RESTORE)
    async restoreSize(@Payload('id') id: string) {
        try {
            return await this.service.restoreSize(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
