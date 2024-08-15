import {
	CreateItemDetailDTO,
	ItemDetailDAO,
	ItemDetailEntity,
	ItemDetailRepository,
	ItemDetailService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { sleep } from '@nestjs/terminus/dist/utils';

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
		current_sku: number,
	): Promise<void> {
		const real_sku = current_sku === 0 ? 1 : current_sku;
		const data: CreateItemDetailDTO = {
			item_id,
			purchase_date: new Date(),
			expiration_date: null,
			returnable: false,
			art_no: null,
		};
		for (let i = 0; i < real_sku; i++) {
			const detail =
				await this.infrastructureService.createItemDetail(data);
			Logger.debug({ ...detail }, 'createItemDetail');
		}
	}
}
