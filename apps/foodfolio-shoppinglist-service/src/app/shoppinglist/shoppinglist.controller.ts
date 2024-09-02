import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FoodfolioShoppinglistTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { ShoppingListService } from './shoppinglist.service';

@Controller('shoppinglist')
export class ShoppingListController {
	constructor(private readonly service: ShoppingListService) {}

	@MessagePattern(FoodfolioShoppinglistTopics.LIST)
	async getShoppingList(
		@Payload('limit') limit: number,
		@Payload('offset') offset: number,
	) {
		try {
			return await this.service.getList(limit, offset);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioShoppinglistTopics.ID)
	async getShoppingListById(@Payload('id') id: string) {
		try {
			return await this.service.getShoppingListById(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioShoppinglistTopics.ITEMID)
	async getShoppingListByItemId(@Payload('item_id') item_id: string) {
		try {
			return await this.service.getShoppingListByItemId(item_id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioShoppinglistTopics.CREATE)
	async createShoppingList(
		@Payload('item_id') item_id: string,
		@Payload('variant_id') variant_id: string,
		@Payload('current_sku') current_sku: number,
		@Payload('min_sku') min_sku: number,
		@Payload('max_sku') max_sku: number,
	) {
		try {
			return await this.service.createShoppingList(
				item_id,
				variant_id,
				current_sku,
				min_sku,
				max_sku,
			);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioShoppinglistTopics.DELETE)
	async deleteShoppingList(@Payload('id') id: string) {
		try {
			return await this.service.deleteShoppingList(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioShoppinglistTopics.RESTORE)
	async restoreShoppingList(@Payload('id') id: string) {
		try {
			return await this.service.restoreShoppingList(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}
}
