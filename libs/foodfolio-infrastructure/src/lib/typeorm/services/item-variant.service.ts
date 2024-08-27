import { ItemVariantService as DomainService } from '@azkaban/foodfolio-domain';
import { ItemVariantRepository } from '../repositories';
import { CreateItemVariantDTO } from '../../dto';
import { ItemVariantDAO } from '../../dao';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ItemVariantService {
	private readonly domainService: DomainService;

	constructor(private readonly repository: ItemVariantRepository) {
		this.domainService = new DomainService(repository);
	}

	async getItemVariantList(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Array<ItemVariantDAO>> {
		const result = await this.domainService.getItemVariants(limit, offset);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getItemVariantByItemId(
		item_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const result = await this.domainService.getItemVariantByItemId(item_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getItemVariantByCategoryId(
		category_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const result =
			await this.domainService.getItemVariantByCategoryId(category_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getItemVariantByLocationId(
		location_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const result =
			await this.domainService.getItemVariantByLocationId(location_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getItemVariantByCompanyId(
		company_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const result =
			await this.domainService.getItemVariantByCompanyId(company_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getItemVariantBySizeId(
		size_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const result = await this.domainService.getItemVariantBySizeId(size_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getItemVariantByTypeId(
		type_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const result = await this.domainService.getItemVariantByTypeId(type_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getItemVariantByWarehouseId(
		warehouse_id: Nullable<string>,
	): Promise<Array<ItemVariantDAO>> {
		const result =
			await this.domainService.getItemVariantByWarehouseId(warehouse_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getItemVariantById(id: string): Promise<ItemVariantDAO> {
		const result = await this.domainService.getItemVariantById(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getItemVariantByTitle(title: string): Promise<ItemVariantDAO> {
		const result = await this.domainService.getItemVariantByTitle(title);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async createItemVariant(
		data: CreateItemVariantDTO,
	): Promise<ItemVariantDAO> {
		const result = await this.domainService.createItemVariant(data);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateTitle(id: string, title: string): Promise<ItemVariantDAO> {
		const result = await this.domainService.updateTitle(id, title);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateSku(id: string, sku: number): Promise<ItemVariantDAO> {
		const result = await this.domainService.updateSku(id, sku);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateEan(
		id: string,
		ean: Nullable<string>,
	): Promise<ItemVariantDAO> {
		const result = await this.domainService.updateEan(id, ean);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updatePrice(
		id: string,
		price: Nullable<number>,
	): Promise<ItemVariantDAO> {
		const result = await this.domainService.updatePrice(id, price);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateActivatedAt(
		id: string,
		activated_at: Nullable<Date>,
	): Promise<ItemVariantDAO> {
		const result = await this.domainService.updateActivatedAt(
			id,
			activated_at,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateItemId(
		id: string,
		item_id: Nullable<string>,
	): Promise<ItemVariantDAO> {
		const result = await this.domainService.updateItemId(id, item_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateCategoryId(
		id: string,
		category_id: Nullable<string>,
	): Promise<ItemVariantDAO> {
		const result = await this.domainService.updateCategoryId(
			id,
			category_id,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateLocationId(
		id: string,
		location_id: Nullable<string>,
	): Promise<ItemVariantDAO> {
		const result = await this.domainService.updateLocationId(
			id,
			location_id,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateCompanyId(
		id: string,
		company_id: Nullable<string>,
	): Promise<ItemVariantDAO> {
		const result = await this.domainService.updateCompanyId(id, company_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateSizeId(
		id: string,
		size_id: Nullable<string>,
	): Promise<ItemVariantDAO> {
		const result = await this.domainService.updateSizeId(id, size_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateTypeId(
		id: string,
		type_id: Nullable<string>,
	): Promise<ItemVariantDAO> {
		const result = await this.domainService.updateSizeId(id, type_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateWarehouseId(
		id: string,
		warehouse_id: Nullable<string>,
	): Promise<ItemVariantDAO> {
		const result = await this.domainService.updateWarehouseId(
			id,
			warehouse_id,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async deleteItemVariant(id: string): Promise<ItemVariantDAO> {
		const result = await this.domainService.deleteItemVariant(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async restoreItemVariant(id: string): Promise<ItemVariantDAO> {
		const result = await this.domainService.restoreItemVariant(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}
}
