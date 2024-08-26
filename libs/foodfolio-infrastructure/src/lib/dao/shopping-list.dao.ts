import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ShoppingListDAO {
	id: string;
	item_id: string;
	variant_id: string;
	current_sku: number;
	min_sku: number;
	max_sku: number;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
	isUpdated: boolean;
	isDeleted: boolean;
}
