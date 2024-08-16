import {
	ItemVariantDAO,
	ItemVariantEntity,
	ItemVariantRepository,
	ItemVariantService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class ItemVariantService {
	private readonly infrastructureRepository: ItemVariantRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('ITEM_VARIANT_REPOSITORY')
		private readonly itemVariantRepository: Repository<ItemVariantEntity>,
	) {
		this.infrastructureRepository = new ItemVariantRepository(
			this.itemVariantRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

	async getList(
		limit: number,
		offset: number,
	): Promise<Array<ItemVariantDAO>> {
		return await this.infrastructureService.getItemVariantList(
			limit,
			offset,
		);
	}

	async getByItemId(
		category_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		return await this.infrastructureService.getItemVariantByCategoryId(
			category_id,
		);
	}

	async getByCategoryId(
		category_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		return await this.infrastructureService.getItemVariantByCategoryId(
			category_id,
		);
	}

	async getByLocationId(
		location_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		return await this.infrastructureService.getItemVariantByLocationId(
			location_id,
		);
	}

	async getByCompanyId(
		company_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		return await this.infrastructureService.getItemVariantByCompanyId(
			company_id,
		);
	}

	async getBySizeId(
		size_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		return await this.infrastructureService.getItemVariantBySizeId(size_id);
	}

	async getByTypeId(
		type_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		return await this.infrastructureService.getItemVariantByTypeId(type_id);
	}

	async getByWarehouseId(
		warehouse_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		return await this.infrastructureService.getItemVariantByWarehouseId(
			warehouse_id,
		);
	}

	async getItemVariantById(id: string): Promise<ItemVariantDAO> {
		return await this.infrastructureService.getItemVariantById(id);
	}

	async createItemVariant(
		item_id: Nullable<string>,
		category_id: Nullable<string>,
		location_id: Nullable<string>,
		company_id: Nullable<string>,
		size_id: Nullable<string>,
		type_id: Nullable<string>,
		warehouse_id: Nullable<string>,
		title: string,
		sku: number,
		ean: Nullable<string>,
		price: Nullable<number>,
	): Promise<ItemVariantDAO> {
		return await this.infrastructureService.createItemVariant({
			item_id,
			category_id,
			location_id,
			company_id,
			size_id,
			type_id,
			warehouse_id,
			title,
			sku,
			ean,
			price,
		});
	}

	async updateItemVariant(
		id: string,
		item_id?: Optional<Nullable<string>>,
		category_id?: Optional<Nullable<string>>,
		location_id?: Optional<Nullable<string>>,
		company_id?: Optional<Nullable<string>>,
		size_id?: Optional<Nullable<string>>,
		type_id?: Optional<Nullable<string>>,
		warehouse_id?: Optional<Nullable<string>>,
		title?: Optional<string>,
		sku?: Optional<number>,
		ean?: Optional<Nullable<string>>,
		price?: Optional<Nullable<number>>,
		activated_at?: Optional<Date>,
	): Promise<ItemVariantDAO> {
		if (item_id !== undefined) {
			await this.infrastructureService.updateItemId(id, item_id);
		}
		if (category_id !== undefined) {
			await this.infrastructureService.updateCategoryId(id, category_id);
		}
		if (location_id !== undefined) {
			await this.infrastructureService.updateLocationId(id, location_id);
		}
		if (company_id !== undefined) {
			await this.infrastructureService.updateCompanyId(id, company_id);
		}
		if (size_id !== undefined) {
			await this.infrastructureService.updateSizeId(id, size_id);
		}
		if (type_id !== undefined) {
			await this.infrastructureService.updateTypeId(id, type_id);
		}
		if (warehouse_id !== undefined) {
			await this.infrastructureService.updateWarehouseId(
				id,
				warehouse_id,
			);
		}
		if (title !== undefined) {
			await this.infrastructureService.updateTitle(id, title);
		}
		if (sku !== undefined) {
			await this.infrastructureService.updateSku(id, sku);
		}
		if (ean !== undefined) {
			await this.infrastructureService.updateEan(id, ean);
		}
		if (price !== undefined) {
			await this.infrastructureService.updatePrice(id, price);
		}
		if (activated_at !== undefined) {
			await this.infrastructureService.updateActivatedAt(
				id,
				activated_at,
			);
		}
		return await this.infrastructureService.getItemVariantById(id);
	}

	async deleteItemVariant(id: string): Promise<ItemVariantDAO> {
		return await this.infrastructureService.deleteItemVariant(id);
	}

	async restoreItemVariant(id: string): Promise<ItemVariantDAO> {
		return await this.infrastructureService.restoreItemVariant(id);
	}
}
