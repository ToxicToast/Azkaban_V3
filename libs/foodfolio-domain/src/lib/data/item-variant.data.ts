import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ItemVariantData {
	readonly item_id: Nullable<string>;
	readonly category_id: Nullable<string>;
	readonly location_id: Nullable<string>;
	readonly company_id: Nullable<string>;
	readonly size_id: Nullable<string>;
	readonly type_id: Nullable<string>;
	readonly warehouse_id: Nullable<string>;
	readonly title: string;
	readonly sku: Nullable<number>;
	readonly ean: Nullable<string>;
	readonly price: Nullable<number>;
}
