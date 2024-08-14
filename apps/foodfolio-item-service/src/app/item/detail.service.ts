import {
	ItemDetailDAO,
	ItemDetailEntity,
	ItemDetailRepository,
	ItemDetailService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Nullable } from '@toxictoast/azkaban-base-types';

@Injectable()
export class DetailService {
	private readonly infrastructureRepository: ItemDetailRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('ITEM_DETAIL_REPOSITORY')
		private readonly itemDetailRepository: Repository<ItemDetailEntity>,
	) {
		this.infrastructureRepository = new ItemDetailRepository(
			this.itemDetailRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
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
}
