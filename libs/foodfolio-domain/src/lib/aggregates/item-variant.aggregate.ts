import { Domain } from '@toxictoast/azkaban-base-domain';
import { ItemVariantAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class ItemVariantAggregate implements Domain<ItemVariantAnemic> {
	constructor(
		private readonly id: string,
		private item_id: Nullable<string>,
		private category_id: Nullable<string>,
		private location_id: Nullable<string>,
		private company_id: Nullable<string>,
		private size_id: Nullable<string>,
		private type_id: Nullable<string>,
		private warehouse_id: Nullable<string>,
		private title: string,
		private sku: number,
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

	delete(): void {
		this.deleted_at = new Date();
	}

	restore(): void {
		this.deleted_at = null;
	}

	toAnemic(): ItemVariantAnemic {
		return {
			id: this.id,
			item_id: this.item_id,
			category_id: this.category_id,
			location_id: this.location_id,
			company_id: this.company_id,
			size_id: this.size_id,
			type_id: this.type_id,
			warehouse_id: this.warehouse_id,
			title: this.title,
			sku: this.sku,
			ean: this.ean,
			price: this.price,
			activated_at: this.activated_at,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
			isActive: this.isActive(),
			isUpdated: this.isUpdated(),
			isDeleted: this.isDeleted(),
		};
	}

	changeItemId(item_id: Nullable<string>): void {
		if (item_id !== this.item_id) {
			this.item_id = item_id;
		}
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

	changeSku(sku: number): void {
		if (sku !== this.sku) {
			this.sku = sku;
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
