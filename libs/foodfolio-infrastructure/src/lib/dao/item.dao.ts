import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ItemDAO {
	id: string;
	title: string;
	current_sku: number;
	min_sku: number;
	max_sku: number;
	isStockAlert: boolean;
	isOverStocked: boolean;
	activated_at: Nullable<Date>;
	isActive: boolean;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
	isUpdated: boolean;
	isDeleted: boolean;
}
