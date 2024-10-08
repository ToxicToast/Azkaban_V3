import { Nullable } from '@toxictoast/azkaban-base-types';

export interface CreateItemVariantDTO {
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
}
