import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ItemDetailData {
	readonly item_id: string;
	readonly purchase_date: Date;
	readonly expiration_date: Nullable<Date>;
	readonly returnable: boolean;
	readonly art_no: Nullable<string>;
}
