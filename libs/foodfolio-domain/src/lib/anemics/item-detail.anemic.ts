import { Anemic } from '@toxictoast/azkaban-base-domain';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ItemDetailAnemic extends Anemic {
	readonly item_id: string;
	readonly art_no: Nullable<string>;
	readonly purchase_date: Date;
	readonly expiration_date: Nullable<Date>;
	readonly opening_date: Nullable<Date>;
	readonly returnable: boolean;
	readonly isExpired: boolean;
	readonly isOpened: boolean;
	readonly activated_at: Nullable<Date>;
	readonly isActive: boolean;
}
