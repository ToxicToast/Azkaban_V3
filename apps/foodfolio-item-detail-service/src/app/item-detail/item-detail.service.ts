import {
	ItemDetailDAO,
	ItemDetailEntity,
	ItemDetailRepository,
	ItemDetailService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class ItemDetailService {
	private readonly infrastructureRepository: ItemDetailRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('ITEM_DETAIL_REPOSITORY')
		private readonly itemRepository: Repository<ItemDetailEntity>,
	) {
		this.infrastructureRepository = new ItemDetailRepository(
			this.itemRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

	async getList(
		limit: number,
		offset: number,
	): Promise<Array<ItemDetailDAO>> {
		return await this.infrastructureService.getItemDetailList(
			limit,
			offset,
		);
	}

	async getByItemId(
		item_id: Nullable<string>,
	): Promise<Array<ItemDetailDAO>> {
		return await this.infrastructureService.getItemDetailByItemId(item_id);
	}

	async getById(id: string): Promise<ItemDetailDAO> {
		return await this.infrastructureService.getItemDetailById(id);
	}

	async createItemDetail(
		item_id: string,
		purchase_date: Date,
		expiration_date: Nullable<Date>,
		returnable: boolean,
		art_no: Nullable<string>,
	): Promise<ItemDetailDAO> {
		return await this.infrastructureService.createItemDetail({
			item_id,
			purchase_date,
			expiration_date,
			returnable,
			art_no,
		});
	}

	async updateItemDetail(
		id: string,
		item_id?: Optional<string>,
		purchase_date?: Optional<Date>,
		expiration_date?: Optional<Nullable<Date>>,
		opening_date?: Optional<Nullable<Date>>,
		returnable?: Optional<boolean>,
		activated_at?: Optional<Date>,
		art_no?: Optional<Nullable<string>>,
	): Promise<ItemDetailDAO> {
		if (item_id !== undefined) {
			await this.infrastructureService.updateItemId(id, item_id);
		}
		if (purchase_date !== undefined) {
			await this.infrastructureService.updatePurchaseDate(
				id,
				purchase_date,
			);
		}
		if (expiration_date !== undefined) {
			await this.infrastructureService.updateExpirationDate(
				id,
				expiration_date,
			);
		}
		if (opening_date !== undefined) {
			await this.infrastructureService.updateOpeningDate(
				id,
				opening_date,
			);
		}
		if (returnable !== undefined) {
			await this.infrastructureService.updateReturnable(id, returnable);
		}
		if (activated_at !== undefined) {
			await this.infrastructureService.updateActivatedAt(
				id,
				activated_at,
			);
		}
		if (art_no !== undefined) {
			await this.infrastructureService.updateArtNo(id, art_no);
		}
		return await this.infrastructureService.getItemDetailById(id);
	}

	async deleteItemDetail(id: string): Promise<ItemDetailDAO> {
		return await this.infrastructureService.deleteItemDetail(id);
	}

	async restoreItemDetail(id: string): Promise<ItemDetailDAO> {
		return await this.infrastructureService.restoreItemDetail(id);
	}
}
