import { Anemic } from '@toxictoast/azkaban-base-domain';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ItemAnemic extends Anemic {
    readonly category_id: Nullable<string>;
    readonly location_id: Nullable<string>;
    readonly company_id: Nullable<string>;
    readonly size_id: Nullable<string>;
    readonly type_id: Nullable<string>;
    readonly warehouse_id: Nullable<string>;
    readonly title: string;
    readonly current_sku: number;
    readonly min_sku: number;
    readonly max_sku: number;
    readonly ean: Nullable<string>;
    readonly price: Nullable<number>;
    readonly isStockAlert: boolean;
    readonly isOverStocked: boolean;
    readonly activated_at: Nullable<Date>;
    readonly isActive: boolean;
}
