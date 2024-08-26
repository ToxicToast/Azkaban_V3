import { Anemic } from '@toxictoast/azkaban-base-domain';

export interface ShoppingListAnemic extends Anemic {
	readonly item_id: string;
	readonly variant_id: string;
	readonly current_sku: number;
	readonly min_sku: number;
	readonly max_sku: number;
}
