import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	ItemDAO,
	ItemVariantDAO,
	ShoppingListDAO,
} from '@azkaban/foodfolio-infrastructure';
import {
	FoodfolioProductTopics,
	FoodfolioProductVariantTopics,
	FoodfolioShoppinglistTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ShoppingListService {
	constructor(
		@Inject('ITEM_SERVICE')
		private readonly itemClient: ClientProxy,
		@Inject('ITEM_VARIANT_SERVICE')
		private readonly itemVariantClient: ClientProxy,
		@Inject('SHOPPINGLIST_SERVICE')
		private readonly shoppingListClient: ClientProxy,
	) {}

	private async getAllItems(): Promise<Array<ItemDAO>> {
		try {
			const payload = RmqRecordBuilderHelper({});
			return await this.itemClient
				.send(FoodfolioProductTopics.LIST, payload)
				.toPromise();
		} catch (e) {
			return [];
		}
	}

	private async getItemsWithStockAlert(): Promise<Array<ItemDAO>> {
		try {
			const items = await this.getAllItems();
			return items.filter(
				(item: ItemDAO) => item.isStockAlert && item.isActive,
			);
		} catch (e) {
			return [];
		}
	}

	private async getItemVariants(item_id): Promise<Array<ItemVariantDAO>> {
		try {
			const payload = RmqRecordBuilderHelper({ item_id });
			const variants = await this.itemVariantClient
				.send(FoodfolioProductVariantTopics.ITEMID, payload)
				.toPromise();
			return variants.filter(
				(variant: ItemVariantDAO) => variant.isActive,
			);
		} catch (e) {
			return [];
		}
	}

	async createShoppingListItem(
		item_id: string,
		variant_id: string,
		current_sku: number,
		min_sku: number,
		max_sku: number,
	): Promise<ShoppingListDAO> {
		try {
			const payload = RmqRecordBuilderHelper({
				item_id,
				variant_id,
				current_sku,
				min_sku,
				max_sku,
			});
			return await this.shoppingListClient
				.send(FoodfolioShoppinglistTopics.CREATE, payload)
				.toPromise();
		} catch (e) {
			Logger.error(e);
		}
	}

	@Cron(CronExpression.EVERY_HOUR, {
		name: 'Empty Products (Hourly)',
	})
	async checkForEmptyProducts(): Promise<void> {
		try {
			const items = await this.getItemsWithStockAlert();
			for (const item of items) {
				const variants = await this.getItemVariants(item.id);
				for (const variant of variants) {
					const item_id = item.id;
					const variant_id = variant.id;
					const current_sku = variant.sku;
					const min_sku = item.min_sku;
					const max_sku = item.max_sku;
					//
					await this.createShoppingListItem(
						item_id,
						variant_id,
						current_sku,
						min_sku,
						max_sku,
					);
				}
			}
		} catch (e) {
			Logger.error(e);
		}
	}
}
