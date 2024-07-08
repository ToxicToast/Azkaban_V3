import { ItemService as DomainService } from '@azkaban/foodfolio-domain';
import { ItemRepository } from '../repositories';
import { CreateItemDTO } from '../../dto';
import { ItemDAO } from '../../dao';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ItemService {
    private readonly domainService: DomainService;

    constructor(private readonly repository: ItemRepository) {
        this.domainService = new DomainService(repository);
    }

    async getItemList(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Array<ItemDAO>> {
        const result = await this.domainService.getItems(limit, offset);
        if (result.isSuccess) {
            return result.value;
        } else {
            return [];
        }
    }

    async getItemByCategoryId(
        category_id: Nullable<string>,
    ): Promise<Array<ItemDAO>> {
        const result =
            await this.domainService.getItemByCategoryId(category_id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async getItemByLocationId(
        location_id: Nullable<string>,
    ): Promise<Array<ItemDAO>> {
        const result =
            await this.domainService.getItemByLocationId(location_id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async getItemByCompanyId(
        company_id: Nullable<string>,
    ): Promise<Array<ItemDAO>> {
        const result = await this.domainService.getItemByCompanyId(company_id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async getItemBySizeId(size_id: Nullable<string>): Promise<Array<ItemDAO>> {
        const result = await this.domainService.getItemBySizeId(size_id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async getItemByTypeId(type_id: Nullable<string>): Promise<Array<ItemDAO>> {
        const result = await this.domainService.getItemByTypeId(type_id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async getItemByWarehouseId(
        warehouse_id: Nullable<string>,
    ): Promise<Array<ItemDAO>> {
        const result =
            await this.domainService.getItemByWarehouseId(warehouse_id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async getItemById(id: string): Promise<ItemDAO> {
        const result = await this.domainService.getItemById(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async createItem(data: CreateItemDTO): Promise<ItemDAO> {
        const result = await this.domainService.createItem(data);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async updateTitle(id: string, title: string): Promise<ItemDAO> {
        const result = await this.domainService.updateTitle(id, title);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async updateCurrentSku(id: string, current_sku: number): Promise<ItemDAO> {
        const result = await this.domainService.updateCurrentSku(
            id,
            current_sku,
        );
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async updateMinSku(id: string, min_sku: number): Promise<ItemDAO> {
        const result = await this.domainService.updateMinSku(id, min_sku);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async updateMaxSku(id: string, max_sku: number): Promise<ItemDAO> {
        const result = await this.domainService.updateMaxSku(id, max_sku);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async updateEan(id: string, ean: Nullable<string>): Promise<ItemDAO> {
        const result = await this.domainService.updateEan(id, ean);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async updatePrice(id: string, price: Nullable<number>): Promise<ItemDAO> {
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
    ): Promise<ItemDAO> {
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

    async updateCategoryId(
        id: string,
        category_id: Nullable<string>,
    ): Promise<ItemDAO> {
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
    ): Promise<ItemDAO> {
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
    ): Promise<ItemDAO> {
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
    ): Promise<ItemDAO> {
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
    ): Promise<ItemDAO> {
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
    ): Promise<ItemDAO> {
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

    async deleteItem(id: string): Promise<ItemDAO> {
        const result = await this.domainService.deleteItem(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async restoreItem(id: string): Promise<ItemDAO> {
        const result = await this.domainService.restoreItem(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }
}
