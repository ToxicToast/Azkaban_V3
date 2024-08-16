import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	FoodfolioCategoryTopics,
	FoodfolioCompanyTopics,
	FoodfolioLocationTopics,
	FoodfolioProductDetailTopics,
	FoodfolioProductTopics,
	FoodfolioProductVariantTopics,
	FoodfolioSizeTopics,
	FoodfolioTypeTopics,
	FoodfolioWarehouseTopics,
	NotifyTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class NotifyService {
	constructor(
		@Inject('NOTIFY_SERVICE') private readonly client: ClientProxy,
	) {}

	async onCreateCategory(id: string, title: string): Promise<void> {
		const notifyPayload = {
			service: 'foodfolio-category-service',
			event: FoodfolioCategoryTopics.CREATE,
			data: {
				id,
				title,
			},
		};
		await this.notify(notifyPayload);
	}

	async onCreateCompany(id: string, title: string): Promise<void> {
		const notifyPayload = {
			service: 'foodfolio-company-service',
			event: FoodfolioCompanyTopics.CREATE,
			data: {
				id,
				title,
			},
		};
		await this.notify(notifyPayload);
	}

	async onCreateLocation(id: string, title: string): Promise<void> {
		const notifyPayload = {
			service: 'foodfolio-location-service',
			event: FoodfolioLocationTopics.CREATE,
			data: {
				id,
				title,
			},
		};
		await this.notify(notifyPayload);
	}

	async onCreateSize(id: string, title: string): Promise<void> {
		const notifyPayload = {
			service: 'foodfolio-size-service',
			event: FoodfolioSizeTopics.CREATE,
			data: {
				id,
				title,
			},
		};
		await this.notify(notifyPayload);
	}

	async onCreateType(id: string, title: string): Promise<void> {
		const notifyPayload = {
			service: 'foodfolio-type-service',
			event: FoodfolioTypeTopics.CREATE,
			data: {
				id,
				title,
			},
		};
		await this.notify(notifyPayload);
	}

	async onCreateItem(id: string, title: string): Promise<void> {
		const notifyPayload = {
			service: 'foodfolio-item-service',
			event: FoodfolioProductTopics.CREATE,
			data: {
				id,
				title,
			},
		};
		await this.notify(notifyPayload);
	}

	async onCreateItemDetail(id: string, item_id: string): Promise<void> {
		const notifyPayload = {
			service: 'foodfolio-item-detail-service',
			event: FoodfolioProductDetailTopics.CREATE,
			data: {
				id,
				item_id,
			},
		};
		await this.notify(notifyPayload);
	}

	async onCreateItemVariant(
		id: string,
		item_id: string,
		title: string,
	): Promise<void> {
		const notifyPayload = {
			service: 'foodfolio-item-variant-service',
			event: FoodfolioProductVariantTopics.CREATE,
			data: {
				id,
				item_id,
				title,
			},
		};
		await this.notify(notifyPayload);
	}

	async onCreateWarehouse(id: string, title: string): Promise<void> {
		const notifyPayload = {
			service: 'foodfolio-warehouse-service',
			event: FoodfolioWarehouseTopics.CREATE,
			data: {
				id,
				title,
			},
		};
		await this.notify(notifyPayload);
	}

	private async notify(payload: {
		service: string;
		event: string;
		data: unknown;
	}): Promise<void> {
		await this.client.emit(NotifyTopics.NOTIFY, payload).toPromise();
	}
}
