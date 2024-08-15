import { ItemDetailService as DomainService } from '@azkaban/foodfolio-domain';
import { ItemDetailRepository } from '../repositories';
import { CreateItemDetailDTO } from '../../dto';
import { ItemDetailDAO } from '../../dao';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ItemDetailService {
	private readonly domainService: DomainService;

	constructor(private readonly repository: ItemDetailRepository) {
		this.domainService = new DomainService(repository);
	}

	async getItemDetailList(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Array<ItemDetailDAO>> {
		const result = await this.domainService.getItemsDetails(limit, offset);
		console.error('getItemDetailList', result);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getItemDetailByItemId(
		item_id: string,
	): Promise<Array<ItemDetailDAO>> {
		const result = await this.domainService.getItemDetailByItemId(item_id);
		console.error('getItemDetailByItemId', result);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getItemDetailById(id: string): Promise<ItemDetailDAO> {
		const result = await this.domainService.getItemDetailById(id);
		console.error('getItemDetailById', result);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async createItemDetail(data: CreateItemDetailDTO): Promise<ItemDetailDAO> {
		const result = await this.domainService.createItemDetail(data);
		console.error('createItemDetail', result);
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
	): Promise<ItemDetailDAO> {
		const result = await this.domainService.updateItemId(id, item_id);
		console.error('updateItemId', result);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateArtNo(
		id: string,
		art_no: Nullable<string>,
	): Promise<ItemDetailDAO> {
		const result = await this.domainService.updateArtNo(id, art_no);
		console.error('updateArtNo', result);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updatePurchaseDate(
		id: string,
		purchase_date: Date,
	): Promise<ItemDetailDAO> {
		const result = await this.domainService.updatePurchaseDate(
			id,
			purchase_date,
		);
		console.error('updatePurchaseDate', result);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateExpirationDate(
		id: string,
		expiration_date: Nullable<Date>,
	): Promise<ItemDetailDAO> {
		const result = await this.domainService.updateExpirationDate(
			id,
			expiration_date,
		);
		console.error('updateExpirationDate', result);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateOpeningDate(
		id: string,
		opening_date: Nullable<Date>,
	): Promise<ItemDetailDAO> {
		const result = await this.domainService.updateOpeningDate(
			id,
			opening_date,
		);
		console.error('updateOpeningDate', result);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateReturnable(
		id: string,
		returnable: boolean,
	): Promise<ItemDetailDAO> {
		const result = await this.domainService.updateReturnable(
			id,
			returnable,
		);
		console.error('updateReturnable', result);
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
	): Promise<ItemDetailDAO> {
		const result = await this.domainService.updateActivatedAt(
			id,
			activated_at,
		);
		console.error('updateActivatedAt', result);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async deleteItemDetail(id: string): Promise<ItemDetailDAO> {
		const result = await this.domainService.deleteItemDetail(id);
		console.error('deleteItemDetail', result);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async restoreItemDetail(id: string): Promise<ItemDetailDAO> {
		const result = await this.domainService.restoreItemDetail(id);
		console.error('restoreItemDetail', result);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}
}
