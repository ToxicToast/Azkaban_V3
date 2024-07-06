import { Nullable } from '@toxictoast/azkaban-base-types';

export interface CreateItemDTO {
    category_id: Nullable<string>;
    location_id: Nullable<string>;
    company_id: Nullable<string>;
    size_id: Nullable<string>;
    type_id: Nullable<string>;
    warehouse_id: Nullable<string>;
    title: string;
    current_sku: number;
    min_sku: number;
    max_sku: number;
    ean: Nullable<string>;
    price: Nullable<number>;
}
