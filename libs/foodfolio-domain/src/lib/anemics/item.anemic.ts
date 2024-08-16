import { Anemic } from '@toxictoast/azkaban-base-domain';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ItemAnemic extends Anemic {
	readonly title: string;
	readonly current_sku: number;
	readonly min_sku: number;
	readonly max_sku: number;
	readonly isStockAlert: boolean;
	readonly isOverStocked: boolean;
	readonly activated_at: Nullable<Date>;
	readonly isActive: boolean;
}
