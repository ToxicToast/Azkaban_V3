import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	FoodfolioCategoryTopics,
	FoodfolioCompanyTopics,
	FoodfolioLocationTopics,
	FoodfolioProductDetailTopics,
	FoodfolioProductTopics,
	FoodfolioProductVariantTopics,
	FoodfolioShoppinglistTopics,
	FoodfolioSizeTopics,
	FoodfolioTypeTopics,
	FoodfolioWarehouseTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class FoodfolioVersionsService {
	constructor(
		@Inject('FOODFOLIO_CATEGORY_SERVICE')
		private readonly foodfolioCategoryClient: ClientProxy,
		@Inject('FOODFOLIO_COMPANY_SERVICE')
		private readonly foodfolioCompanyClient: ClientProxy,
		@Inject('FOODFOLIO_LOCATION_SERVICE')
		private readonly foodfolioLocationClient: ClientProxy,
		@Inject('FOODFOLIO_SIZE_SERVICE')
		private readonly foodfolioSizeClient: ClientProxy,
		@Inject('FOODFOLIO_TYPE_SERVICE')
		private readonly foodfolioTypeClient: ClientProxy,
		@Inject('FOODFOLIO_ITEM_SERVICE')
		private readonly foodfolioItemClient: ClientProxy,
		@Inject('FOODFOLIO_ITEM_DETAIL_SERVICE')
		private readonly foodfolioItemDetailClient: ClientProxy,
		@Inject('FOODFOLIO_ITEM_VARIANT_SERVICE')
		private readonly foodfolioItemVariantClient: ClientProxy,
		@Inject('FOODFOLIO_WAREHOUSE_SERVICE')
		private readonly foodfolioWarehouseClient: ClientProxy,
		@Inject('FOODFOLIO_SHOPPINGLIST_SERVICE')
		private readonly foodfolioShoppinglistClient: ClientProxy,
	) {}

	private async getFoodFolioCategoryVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioCategoryClient
			.send(FoodfolioCategoryTopics.VERSION, payload)
			.toPromise();
	}

	private async getFoodFolioCompanyVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioCompanyClient
			.send(FoodfolioCompanyTopics.VERSION, payload)
			.toPromise();
	}

	private async getFoodFolioLocationVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioLocationClient
			.send(FoodfolioLocationTopics.VERSION, payload)
			.toPromise();
	}

	private async getFoodFolioSizeVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioSizeClient
			.send(FoodfolioSizeTopics.VERSION, payload)
			.toPromise();
	}

	private async getFoodFolioTypeVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioTypeClient
			.send(FoodfolioTypeTopics.VERSION, payload)
			.toPromise();
	}

	private async getFoodFolioItemVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioItemClient
			.send(FoodfolioProductTopics.VERSION, payload)
			.toPromise();
	}

	private async getFoodFolioItemDetailVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioItemDetailClient
			.send(FoodfolioProductDetailTopics.VERSION, payload)
			.toPromise();
	}

	private async getFoodFolioItemVariantVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioItemVariantClient
			.send(FoodfolioProductVariantTopics.VERSION, payload)
			.toPromise();
	}

	private async getFoodFolioWarehouseVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioWarehouseClient
			.send(FoodfolioWarehouseTopics.VERSION, payload)
			.toPromise();
	}

	private async getFoodFolioShoppingListVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioShoppinglistClient
			.send(FoodfolioShoppinglistTopics.VERSION, payload)
			.toPromise();
	}

	async getFoodfolioVersions() {
		const category = await this.getFoodFolioCategoryVersion();
		const company = await this.getFoodFolioCompanyVersion();
		const location = await this.getFoodFolioLocationVersion();
		const type = await this.getFoodFolioTypeVersion();
		const size = await this.getFoodFolioSizeVersion();
		const item = await this.getFoodFolioItemVersion();
		const itemvariant = await this.getFoodFolioItemVariantVersion();
		const itemdetail = await this.getFoodFolioItemDetailVersion();
		const warehouse = await this.getFoodFolioWarehouseVersion();
		const shoppinglist = await this.getFoodFolioShoppingListVersion();
		//
		return {
			category,
			company,
			location,
			type,
			size,
			item,
			itemvariant,
			itemdetail,
			warehouse,
			shoppinglist,
		};
	}
}
