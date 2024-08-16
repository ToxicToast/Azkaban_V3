import { Controller } from '@nestjs/common';
import { ItemDetailService } from './item-detail.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FoodfolioProductDetailTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Controller('item-detail')
export class ItemDetailController {
	constructor(private readonly service: ItemDetailService) {}

	@MessagePattern(FoodfolioProductDetailTopics.LIST)
	async getItemDetailList(
		@Payload('limit') limit: number,
		@Payload('offset') offset: number,
	) {
		try {
			return await this.service.getList(limit, offset);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductDetailTopics.ITEMID)
	async getItemDetailByItemId(@Payload('item_id') item_id: Nullable<string>) {
		try {
			return await this.service.getByItemId(item_id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductDetailTopics.ID)
	async getItemDetailById(@Payload('id') id: string) {
		try {
			return await this.service.getById(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductDetailTopics.CREATE)
	async createItemDetail(
		@Payload('item_id') item_id: string,
		@Payload('purchase_date') purchase_date: Date,
		@Payload('expiration_date') expiration_date: Nullable<Date>,
		@Payload('returnable') returnable: boolean,
		@Payload('art_no') art_no: Nullable<string>,
	) {
		try {
			return await this.service.createItemDetail(
				item_id,
				purchase_date,
				expiration_date,
				returnable,
				art_no,
			);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductDetailTopics.UPDATE)
	async updateItemDetail(
		@Payload('id') id: string,
		@Payload('item_id') item_id?: Optional<string>,
		@Payload('purchase_date') purchase_date?: Optional<Date>,
		@Payload('expiration_date') expiration_date?: Optional<Nullable<Date>>,
		@Payload('opening_date') opening_date?: Optional<Nullable<Date>>,
		@Payload('returnable') returnable?: Optional<boolean>,
		@Payload('activated_at') activated_at?: Optional<Date>,
		@Payload('art_no') art_no?: Optional<Nullable<string>>,
	) {
		try {
			return await this.service.updateItemDetail(
				id,
				item_id,
				purchase_date,
				expiration_date,
				opening_date,
				returnable,
				activated_at,
				art_no,
			);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductDetailTopics.DELETE)
	async deleteItemDetail(@Payload('id') id: string) {
		try {
			return await this.service.deleteItemDetail(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductDetailTopics.RESTORE)
	async restoreItemDetail(@Payload('id') id: string) {
		try {
			return await this.service.restoreItemDetail(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}
}
