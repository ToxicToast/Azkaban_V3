import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ItemDetailDAO {
	id: string;
	item_id: string;
	art_no: Nullable<string>;
	purchase_date: Date;
	expiration_date: Nullable<Date>;
	opening_date: Nullable<Date>;
	returnable: boolean;
	activated_at: Nullable<Date>;
	isActive: boolean;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
	isUpdated: boolean;
	isDeleted: boolean;
	isExpired: boolean;
	isOpened: boolean;
}
