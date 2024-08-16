import { Domain } from '@toxictoast/azkaban-base-domain';
import { ItemAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class ItemAggregate implements Domain<ItemAnemic> {
	constructor(
		private readonly id: string,
		private title: string,
		private current_sku: number,
		private min_sku: number,
		private max_sku: number,
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
			title: this.title,
			current_sku: this.current_sku,
			min_sku: this.min_sku,
			max_sku: this.max_sku,
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

	changeActivatedAt(activated_at: Nullable<Date>): void {
		if (activated_at !== this.activated_at) {
			this.activated_at = activated_at;
			this.updated_at = new Date();
		}
	}
}
