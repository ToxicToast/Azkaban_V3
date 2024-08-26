import { Domain } from '@toxictoast/azkaban-base-domain';
import { ShoppingListAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class ShoppingListAggregate implements Domain<ShoppingListAnemic> {
	constructor(
		private readonly id: string,
		private readonly item_id: string,
		private readonly variant_id: string,
		private readonly current_sku: number,
		private readonly min_sku: number,
		private readonly max_sku: number,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {}

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

	toAnemic(): ShoppingListAnemic {
		return {
			id: this.id,
			item_id: this.item_id,
			variant_id: this.variant_id,
			current_sku: this.current_sku,
			min_sku: this.min_sku,
			max_sku: this.max_sku,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
			isUpdated: this.isUpdated(),
			isDeleted: this.isDeleted(),
		};
	}
}
