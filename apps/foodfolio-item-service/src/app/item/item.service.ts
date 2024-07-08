import {
    ItemDAO,
    ItemEntity,
    ItemRepository,
    ItemService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

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

    async getByCategoryId(
        category_id: Nullable<string>,
    ): Promise<Array<ItemDAO>> {
        return await this.infrastructureService.getItemByCategoryId(
            category_id,
        );
    }

    async getByLocationId(
        location_id: Nullable<string>,
    ): Promise<Array<ItemDAO>> {
        return await this.infrastructureService.getItemByLocationId(
            location_id,
        );
    }

    async getByCompanyId(
        company_id: Nullable<string>,
    ): Promise<Array<ItemDAO>> {
        return await this.infrastructureService.getItemByCompanyId(company_id);
    }

    async getBySizeId(size_id: Nullable<string>): Promise<Array<ItemDAO>> {
        return await this.infrastructureService.getItemBySizeId(size_id);
    }

    async getByTypeId(type_id: Nullable<string>): Promise<Array<ItemDAO>> {
        return await this.infrastructureService.getItemByTypeId(type_id);
    }

    async getByWarehouseId(
        warehouse_id: Nullable<string>,
    ): Promise<Array<ItemDAO>> {
        return await this.infrastructureService.getItemByWarehouseId(
            warehouse_id,
        );
    }

    async getItemById(id: string): Promise<ItemDAO> {
        return await this.infrastructureService.getItemById(id);
    }

    async createItem(
        category_id: Nullable<string>,
        location_id: Nullable<string>,
        company_id: Nullable<string>,
        size_id: Nullable<string>,
        type_id: Nullable<string>,
        warehouse_id: Nullable<string>,
        title: string,
        current_sku: number,
        min_sku: number,
        max_sku: number,
        ean: Nullable<string>,
        price: Nullable<number>,
    ): Promise<ItemDAO> {
        return await this.infrastructureService.createItem({
            category_id,
            location_id,
            company_id,
            size_id,
            type_id,
            warehouse_id,
            title,
            current_sku,
            min_sku,
            max_sku,
            ean,
            price,
        });
    }

    async updateItem(
        id: string,
        category_id?: Optional<Nullable<string>>,
        location_id?: Optional<Nullable<string>>,
        company_id?: Optional<Nullable<string>>,
        size_id?: Optional<Nullable<string>>,
        type_id?: Optional<Nullable<string>>,
        warehouse_id?: Optional<Nullable<string>>,
        title?: Optional<string>,
        current_sku?: Optional<number>,
        min_sku?: Optional<number>,
        max_sku?: Optional<number>,
        ean?: Optional<Nullable<string>>,
        price?: Optional<Nullable<number>>,
        activated_at?: Optional<Date>,
    ): Promise<ItemDAO> {
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
        if (current_sku !== undefined) {
            await this.infrastructureService.updateCurrentSku(id, current_sku);
        }
        if (min_sku !== undefined) {
            await this.infrastructureService.updateMinSku(id, min_sku);
        }
        if (max_sku !== undefined) {
            await this.infrastructureService.updateMaxSku(id, max_sku);
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
        return await this.infrastructureService.getItemById(id);
    }

    async deleteItem(id: string): Promise<ItemDAO> {
        return await this.infrastructureService.deleteItem(id);
    }

    async restoreItem(id: string): Promise<ItemDAO> {
        return await this.infrastructureService.restoreItem(id);
    }
}
