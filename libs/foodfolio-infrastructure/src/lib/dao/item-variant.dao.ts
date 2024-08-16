import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ItemVariantDAO {
	id: string;
	item_id: Nullable<string>;
	category_id: Nullable<string>;
	location_id: Nullable<string>;
	company_id: Nullable<string>;
	size_id: Nullable<string>;
	type_id: Nullable<string>;
	warehouse_id: Nullable<string>;
	title: string;
	sku: number;
	ean: Nullable<string>;
	price: Nullable<number>;
	activated_at: Nullable<Date>;
	isActive: boolean;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
	isUpdated: boolean;
	isDeleted: boolean;
}
