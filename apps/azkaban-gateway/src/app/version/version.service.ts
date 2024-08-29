import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	AuthTopics,
	CronjobTopics,
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
	GroupsTopics,
	NotifyTopics,
	RmqRecordBuilderHelper,
	UserTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class VersionService {
	constructor(
		@Inject('WEBHOOKS_SERVICE') private readonly hooksClient: ClientProxy,
		@Inject('APIALERTS_SERVICE')
		private readonly apialertsClient: ClientProxy,
		@Inject('NOTIFICATIONS_SERVICE')
		private readonly notificationsClient: ClientProxy,
		@Inject('SSE_SERVICE') private readonly sseClient: ClientProxy,
		//
		@Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
		@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
		@Inject('GROUP_SERVICE') private readonly groupClient: ClientProxy,
		//
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
		@Inject('CRONJOB_SERVICE')
		private readonly cronjobClient: ClientProxy,
		//
		@Inject('APP_VERSION') private readonly appVersion: string,
	) {}

	getGatewayVersion() {
		return {
			gateway: this.appVersion,
		};
	}

	async getWebhooksVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.hooksClient
			.send(NotifyTopics.VERSION, payload)
			.toPromise();
	}

	async getApiAlertsVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.apialertsClient
			.send(NotifyTopics.VERSION, payload)
			.toPromise();
	}

	async getNotificationsVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.notificationsClient
			.send(NotifyTopics.VERSION, payload)
			.toPromise();
	}

	async getSSEVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.sseClient
			.send(NotifyTopics.VERSION, payload)
			.toPromise();
	}

	async getUsersVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.usersClient
			.send(UserTopics.VERSION, payload)
			.toPromise();
	}

	async getAuthVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.authClient
			.send(AuthTopics.VERSION, payload)
			.toPromise();
	}

	async getGroupsVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.groupClient
			.send(GroupsTopics.VERSION, payload)
			.toPromise();
	}

	async getFoodFolioCategoryVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioCategoryClient
			.send(FoodfolioCategoryTopics.VERSION, payload)
			.toPromise();
	}

	async getFoodFolioCompanyVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioCompanyClient
			.send(FoodfolioCompanyTopics.VERSION, payload)
			.toPromise();
	}

	async getFoodFolioLocationVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioLocationClient
			.send(FoodfolioLocationTopics.VERSION, payload)
			.toPromise();
	}

	async getFoodFolioSizeVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioSizeClient
			.send(FoodfolioSizeTopics.VERSION, payload)
			.toPromise();
	}

	async getFoodFolioTypeVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioTypeClient
			.send(FoodfolioTypeTopics.VERSION, payload)
			.toPromise();
	}

	async getFoodFolioItemVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioItemClient
			.send(FoodfolioProductTopics.VERSION, payload)
			.toPromise();
	}

	async getFoodFolioItemDetailVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioItemDetailClient
			.send(FoodfolioProductDetailTopics.VERSION, payload)
			.toPromise();
	}

	async getFoodFolioItemVariantVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioItemVariantClient
			.send(FoodfolioProductVariantTopics.VERSION, payload)
			.toPromise();
	}

	async getFoodFolioWarehouseVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioWarehouseClient
			.send(FoodfolioWarehouseTopics.VERSION, payload)
			.toPromise();
	}

	async getFoodFolioShoppingListVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.foodfolioShoppinglistClient
			.send(FoodfolioShoppinglistTopics.VERSION, payload)
			.toPromise();
	}

	async getCronjobVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.cronjobClient
			.send(CronjobTopics.VERSION, payload)
			.toPromise();
	}
}
