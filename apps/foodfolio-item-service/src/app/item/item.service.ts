import {
	ItemDAO,
	ItemEntity,
	ItemRepository,
	ItemService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class ItemService {
	private readonly infrastructureRepository: ItemRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('ITEM_REPOSITORY')
		private readonly itemRepository: Repository<ItemEntity>,
	) {
		this.infrastructureRepository = new ItemRepository(this.itemRepository);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

	async getList(limit: number, offset: number): Promise<Array<ItemDAO>> {
		return await this.infrastructureService.getItemList(limit, offset);
	}

	async getItemById(id: string): Promise<ItemDAO> {
		return await this.infrastructureService.getItemById(id);
	}

	async createItem(
		title: string,
		current_sku: number,
		min_sku: number,
		max_sku: number,
	): Promise<ItemDAO> {
		return await this.infrastructureService.createItem({
			title,
			current_sku,
			min_sku,
			max_sku,
		});
	}

	async updateItem(
		id: string,
		title?: Optional<string>,
		current_sku?: Optional<number>,
		min_sku?: Optional<number>,
		max_sku?: Optional<number>,
		activated_at?: Optional<Date>,
	): Promise<ItemDAO> {
		if (title !== undefined) {
			await this.infrastructureService.updateTitle(id, title);
		}
		if (current_sku !== undefined) {
			await this.infrastructureService.updateCurrentSku(id, current_sku);
		}
		if (min_sku !== undefined) {
			await this.infrastructureService.updateMinSku(id, min_sku);
		}
		if (max_sku !== undefined) {
			await this.infrastructureService.updateMaxSku(id, max_sku);
		}
		if (activated_at !== undefined) {
			await this.infrastructureService.updateActivatedAt(
				id,
				activated_at,
			);
		}
		return await this.infrastructureService.getItemById(id);
	}

	async deleteItem(id: string): Promise<ItemDAO> {
		return await this.infrastructureService.deleteItem(id);
	}

	async restoreItem(id: string): Promise<ItemDAO> {
		return await this.infrastructureService.restoreItem(id);
	}
}
