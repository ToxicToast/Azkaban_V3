import { Controller } from '@nestjs/common';
import { ItemService } from './item.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FoodfolioProductTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Optional } from '@toxictoast/azkaban-base-types';

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

	@MessagePattern(FoodfolioProductTopics.ID)
	async getItemById(@Payload('id') id: string) {
		try {
			return await this.service.getItemById(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductTopics.CREATE)
	async createProduct(
		@Payload('title') title: string,
		@Payload('current_sku') current_sku: number,
		@Payload('min_sku') min_sku: number,
		@Payload('max_sku') max_sku: number,
	) {
		try {
			return await this.service.createItem(
				title,
				current_sku,
				min_sku,
				max_sku,
			);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductTopics.UPDATE)
	async updateProduct(
		@Payload('id') id: string,
		@Payload('title') title?: Optional<string>,
		@Payload('current_sku') current_sku?: Optional<number>,
		@Payload('min_sku') min_sku?: Optional<number>,
		@Payload('max_sku') max_sku?: Optional<number>,
		@Payload('activated_at') activated_at?: Optional<Date>,
	) {
		try {
			return await this.service.updateItem(
				id,
				title,
				current_sku,
				min_sku,
				max_sku,
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
