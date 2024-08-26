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
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Nullable } from '@toxictoast/azkaban-base-types';

@Injectable()
export class ShoppingListService {
	constructor(
		@Inject('ITEM_SERVICE') private readonly itemClient: ClientProxy,
		@Inject('ITEM_VARIANT_SERVICE')
		private readonly itemVariantClient: ClientProxy,
		@Inject('SHOPPINGLIST_SERVICE')
		private readonly shoppingListClient: ClientProxy,
	) {}

	private async getAllItems(): Promise<Array<ItemDAO>> {
		return await this.itemClient
			.send(FoodfolioProductTopics.LIST, {})
			.toPromise();
	}

	private async getItemsWithStockAlert(): Promise<Array<ItemDAO>> {
		const items = await this.getAllItems();
		return items.filter((item) => item.isStockAlert);
	}

	private async getItemVariants(item_id): Promise<Array<ItemVariantDAO>> {
		return await this.itemVariantClient
			.send(FoodfolioProductVariantTopics.ITEMID, { item_id })
			.toPromise();
	}

	async createShoppingListItem(
		item_id: string,
		variant_id: string,
		current_sku: number,
		min_sku: number,
		max_sku: number,
	): Promise<ShoppingListDAO> {
		return await this.shoppingListClient
			.send(FoodfolioShoppinglistTopics.CREATE, {
				item_id,
				variant_id,
				current_sku,
				min_sku,
				max_sku,
			})
			.toPromise();
	}

	async checkForShoppingListEntry(
		item_id: string,
		variant_id: string,
	): Promise<Nullable<ShoppingListDAO>> {
		const items = await this.shoppingListClient
			.send(FoodfolioShoppinglistTopics.ITEMID, { item_id })
			.toPromise();
		return items.find((item) => item.variant_id === variant_id) ?? null;
	}

	@Cron(CronExpression.EVERY_HOUR, {
		name: 'Empty Products (Hourly)',
		timeZone: 'Europe/Berlin',
	})
	async checkForEmptyProducts(): Promise<void> {
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
				const check = await this.checkForShoppingListEntry(
					item_id,
					variant_id,
				);
				//
				if (check === null) {
					const result = await this.createShoppingListItem(
						item_id,
						variant_id,
						current_sku,
						min_sku,
						max_sku,
					);
					Logger.debug({ result });
				}
			}
		}
	}
}
