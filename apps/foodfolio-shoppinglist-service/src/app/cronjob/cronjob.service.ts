import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import {
	ItemDAO,
	ItemEntity,
	ItemRepository,
	ItemService as BaseService,
} from '@azkaban/foodfolio-infrastructure';

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

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
		name: 'Empty Products',
		timeZone: 'Europe/Berlin',
	})
	async checkForEmptyProducts(): Promise<void> {
		this.logger.debug('Checking for empty products');
		const emptyProducts = await this.getProductsWithStockAlert();
		this.logger.debug({ ...emptyProducts });
	}
}
