import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import {
	ItemDAO,
	ItemEntity,
	ItemRepository,
	ItemService as BaseService,
} from '@azkaban/foodfolio-infrastructure';

// TODO: Move this to a dedicated Cronjob Microservice
@Injectable()
export class CronjobService {
	private readonly infrastructureRepository: ItemRepository;
	private readonly infrastructureService: BaseService;
	private readonly logger = new Logger(CronjobService.name);

	constructor(
		@Inject('ITEM_REPOSITORY')
		private readonly itemRepository: Repository<ItemEntity>,
	) {
		this.infrastructureRepository = new ItemRepository(this.itemRepository);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

	private async getProductsWithStockAlert(): Promise<Array<ItemDAO>> {
		const items = await this.infrastructureService.getItemList();
		return items.filter((item) => item.isStockAlert);
	}

	async createShoppingListItem(item: ItemDAO): Promise<void> {
		this.logger.debug('Creating shopping list item');
		const itemData = {
			item_id: item.id,
			current_sku: item.current_sku,
			min_sku: item.min_sku,
			max_sku: item.max_sku,
		};
		this.logger.debug({ ...itemData });
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
		name: 'Empty Products (Daily)',
		timeZone: 'Europe/Berlin',
	})
	async checkForEmptyProducts(): Promise<void> {
		this.logger.debug('Checking for empty products');
		const emptyProducts = await this.getProductsWithStockAlert();
		for (let i = 0; i < emptyProducts.length; i++) {
			await this.createShoppingListItem(emptyProducts[i]);
		}
	}

	@Cron(CronExpression.EVERY_HOUR, {
		name: 'Empty Products (Hourly)',
		timeZone: 'Europe/Berlin',
	})
	async checkForEmptyProductsHourly(): Promise<void> {
		await this.checkForEmptyProducts();
	}
}
