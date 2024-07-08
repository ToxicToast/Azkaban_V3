import { Domain } from '@toxictoast/azkaban-base-domain';
import { ItemAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class ItemAggregate implements Domain<ItemAnemic> {
    constructor(
        private readonly id: string,
        private category_id: Nullable<string>,
        private location_id: Nullable<string>,
        private company_id: Nullable<string>,
        private size_id: Nullable<string>,
        private type_id: Nullable<string>,
        private warehouse_id: Nullable<string>,
        private title: string,
        private current_sku: number,
        private min_sku: number,
        private max_sku: number,
        private ean: Nullable<string>,
        private price: Nullable<number>,
        private activated_at: Nullable<Date>,
        private readonly created_at: Date,
        private updated_at: Nullable<Date>,
        private deleted_at: Nullable<Date>,
    ) {}

    isActive(): boolean {
        return !!this.activated_at;
    }

    isUpdated(): boolean {
        return !!this.updated_at;
    }

    isDeleted(): boolean {
        return !!this.deleted_at;
    }

    isStockAlert(): boolean {
        return this.current_sku < this.min_sku;
    }

    isOverStocked(): boolean {
        return this.current_sku > this.max_sku;
    }

    delete(): void {
        this.deleted_at = new Date();
    }

    restore(): void {
        this.deleted_at = null;
    }

    toAnemic(): ItemAnemic {
        return {
            id: this.id,
            category_id: this.category_id,
            location_id: this.location_id,
            company_id: this.company_id,
            size_id: this.size_id,
            type_id: this.type_id,
            warehouse_id: this.warehouse_id,
            title: this.title,
            current_sku: this.current_sku,
            min_sku: this.min_sku,
            max_sku: this.max_sku,
            ean: this.ean,
            price: this.price,
            isStockAlert: this.isStockAlert(),
            isOverStocked: this.isOverStocked(),
            activated_at: this.activated_at,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
            isActive: this.isActive(),
            isUpdated: this.isUpdated(),
            isDeleted: this.isDeleted(),
        };
    }

    changeCategoryId(category_id: Nullable<string>): void {
        if (category_id !== this.category_id) {
            this.category_id = category_id;
        }
    }

    changeLocationId(location_id: Nullable<string>): void {
        if (location_id !== this.location_id) {
            this.location_id = location_id;
        }
    }

    changeCompanyId(company_id: Nullable<string>): void {
        if (company_id !== this.company_id) {
            this.company_id = company_id;
        }
    }

    changeSizeId(size_id: Nullable<string>): void {
        if (size_id !== this.size_id) {
            this.size_id = size_id;
        }
    }

    changeTypeId(type_id: Nullable<string>): void {
        if (type_id !== this.type_id) {
            this.type_id = type_id;
        }
    }

    changeWarehouseId(warehouse_id: Nullable<string>): void {
        if (warehouse_id !== this.warehouse_id) {
            this.warehouse_id = warehouse_id;
        }
    }

    changeTitle(title: string): void {
        if (title !== this.title) {
            this.title = title;
            this.updated_at = new Date();
        }
    }

    changeCurrentSku(current_sku: number): void {
        if (current_sku !== this.current_sku) {
            this.current_sku = current_sku;
            this.updated_at = new Date();
        }
    }

    changeMinSku(min_sku: number): void {
        if (min_sku !== this.min_sku) {
            this.min_sku = min_sku;
            this.updated_at = new Date();
        }
    }

    changeMaxSku(max_sku: number): void {
        if (max_sku !== this.max_sku) {
            this.max_sku = max_sku;
            this.updated_at = new Date();
        }
    }

    changeEan(ean: Nullable<string>): void {
        if (ean !== this.ean) {
            this.ean = ean;
            this.updated_at = new Date();
        }
    }

    changePrice(price: Nullable<number>): void {
        if (price !== this.price) {
            this.price = price;
            this.updated_at = new Date();
        }
    }

    changeActivatedAt(activated_at: Nullable<Date>): void {
        if (activated_at !== this.activated_at) {
            this.activated_at = activated_at;
            this.updated_at = new Date();
        }
    }
}
