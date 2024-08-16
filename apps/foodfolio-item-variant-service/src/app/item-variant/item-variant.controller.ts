import { Controller } from '@nestjs/common';
import { ItemVariantService } from './item-variant.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FoodfolioProductVariantTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Controller('item')
export class ItemVariantController {
	constructor(private readonly service: ItemVariantService) {}

	@MessagePattern(FoodfolioProductVariantTopics.LIST)
	async getItemVariantList(
		@Payload('limit') limit: number,
		@Payload('offset') offset: number,
	) {
		try {
			return await this.service.getList(limit, offset);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductVariantTopics.ITEMID)
	async getItemVariantByItemId(
		@Payload('item_id') item_id: Nullable<string>,
	) {
		try {
			return await this.service.getByItemId(item_id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductVariantTopics.CATEGORYID)
	async getItemVariantByCategoryId(
		@Payload('category_id') category_id: Nullable<string>,
	) {
		try {
			return await this.service.getByCategoryId(category_id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductVariantTopics.LOCATIONID)
	async getItemVariantByLocationId(
		@Payload('location_id') location_id: Nullable<string>,
	) {
		try {
			return await this.service.getByLocationId(location_id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductVariantTopics.COMPANYID)
	async getItemVariantByCompanyId(
		@Payload('company_id') company_id: Nullable<string>,
	) {
		try {
			return await this.service.getByCompanyId(company_id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductVariantTopics.SIZEID)
	async getItemVariantBySizeId(
		@Payload('size_id') size_id: Nullable<string>,
	) {
		try {
			return await this.service.getBySizeId(size_id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductVariantTopics.TYPEID)
	async getItemVariantByTypeId(
		@Payload('type_id') type_id: Nullable<string>,
	) {
		try {
			return await this.service.getByTypeId(type_id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductVariantTopics.WAREHOUSEID)
	async getItemVariantByWarehouseId(
		@Payload('warehouse_id') warehouse_id: Nullable<string>,
	) {
		try {
			return await this.service.getByWarehouseId(warehouse_id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductVariantTopics.ID)
	async getItemVariantById(@Payload('id') id: string) {
		try {
			return await this.service.getItemVariantById(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductVariantTopics.CREATE)
	async createProduct(
		@Payload('item_id') item_id: Nullable<string>,
		@Payload('category_id') category_id: Nullable<string>,
		@Payload('location_id') location_id: Nullable<string>,
		@Payload('company_id') company_id: Nullable<string>,
		@Payload('size_id') size_id: Nullable<string>,
		@Payload('type_id') type_id: Nullable<string>,
		@Payload('warehouse_id') warehouse_id: Nullable<string>,
		@Payload('title') title: string,
		@Payload('sku') sku: number,
		@Payload('ean') ean: Nullable<string>,
		@Payload('price') price: Nullable<number>,
	) {
		try {
			return await this.service.createItemVariant(
				item_id,
				category_id,
				location_id,
				company_id,
				size_id,
				type_id,
				warehouse_id,
				title,
				sku,
				ean,
				price,
			);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductVariantTopics.UPDATE)
	async updateProduct(
		@Payload('id') id: string,
		@Payload('item_id') item_id?: Optional<Nullable<string>>,
		@Payload('category_id') category_id?: Optional<Nullable<string>>,
		@Payload('location_id') location_id?: Optional<Nullable<string>>,
		@Payload('company_id') company_id?: Optional<Nullable<string>>,
		@Payload('size_id') size_id?: Optional<Nullable<string>>,
		@Payload('type_id') type_id?: Optional<Nullable<string>>,
		@Payload('warehouse_id') warehouse_id?: Optional<Nullable<string>>,
		@Payload('title') title?: Optional<string>,
		@Payload('sku') sku?: Optional<number>,
		@Payload('ean') ean?: Optional<Nullable<string>>,
		@Payload('price') price?: Optional<Nullable<number>>,
		@Payload('activated_at') activated_at?: Optional<Date>,
	) {
		try {
			return await this.service.updateItemVariant(
				id,
				item_id,
				category_id,
				location_id,
				company_id,
				size_id,
				type_id,
				warehouse_id,
				title,
				sku,
				ean,
				price,
				activated_at,
			);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductVariantTopics.DELETE)
	async deleteProduct(@Payload('id') id: string) {
		try {
			return await this.service.deleteItemVariant(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(FoodfolioProductVariantTopics.RESTORE)
	async restoreProduct(@Payload('id') id: string) {
		try {
			return await this.service.restoreItemVariant(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}
}
