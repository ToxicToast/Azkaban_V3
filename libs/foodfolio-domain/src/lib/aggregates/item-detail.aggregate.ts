import { Domain } from '@toxictoast/azkaban-base-domain';
import { ItemDetailAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class ItemDetailAggregate implements Domain<ItemDetailAnemic> {
	constructor(
		private readonly id: string,
		private item_id: string,
		private art_no: Nullable<string>,
		private purchase_date: Date,
		private expiration_date: Nullable<Date>,
		private opening_date: Nullable<Date>,
		private returnable: boolean,
		private activated_at: Nullable<Date>,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {}

	isExpired(): boolean {
		if (this.expiration_date !== null) {
			const date = new Date().getTime();
			return date > this.expiration_date.getTime();
		}
		return false;
	}

	isOpen(): boolean {
		return !!this.opening_date;
	}

	isActive(): boolean {
		return !!this.activated_at;
	}

	isUpdated(): boolean {
		return !!this.updated_at;
	}

	isDeleted(): boolean {
		return !!this.deleted_at;
	}

	delete(): void {
		this.deleted_at = new Date();
	}

	restore(): void {
		this.deleted_at = null;
	}

	toAnemic(): ItemDetailAnemic {
		return {
			id: this.id,
			item_id: this.item_id,
			art_no: this.art_no,
			purchase_date: this.purchase_date,
			expiration_date: this.expiration_date,
			opening_date: this.opening_date,
			returnable: this.returnable,
			activated_at: this.activated_at,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
			isExpired: this.isExpired(),
			isOpened: this.isOpen(),
			isActive: this.isActive(),
			isUpdated: this.isUpdated(),
			isDeleted: this.isDeleted(),
		};
	}

	changeItemId(item_id: string): void {
		if (item_id !== this.item_id) {
			this.item_id = item_id;
		}
	}

	changeArtNo(art_no: Nullable<string>): void {
		if (art_no !== this.art_no) {
			this.art_no = art_no;
		}
	}

	changePurchaseDate(purchase_date: Date): void {
		if (purchase_date !== this.purchase_date) {
			this.purchase_date = purchase_date;
		}
	}

	changeExpirationDate(expiration_date: Nullable<Date>): void {
		if (expiration_date !== this.expiration_date) {
			this.expiration_date = expiration_date;
		}
	}

	changeOpeningDate(opening_date: Nullable<Date>): void {
		if (opening_date !== this.opening_date) {
			this.opening_date = opening_date;
		}
	}

	changeReturnable(returnable: boolean): void {
		if (returnable !== this.returnable) {
			this.returnable = returnable;
		}
	}

	changeActivatedAt(activated_at: Nullable<Date>): void {
		if (activated_at !== this.activated_at) {
			this.activated_at = activated_at;
			this.updated_at = new Date();
		}
	}
}
