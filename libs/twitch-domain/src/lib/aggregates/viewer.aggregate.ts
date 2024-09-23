import { Domain } from '@toxictoast/azkaban-base-domain';
import { ViewerAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class ViewerAggregate implements Domain<ViewerAnemic> {
	constructor(
		private readonly id: string,
		private user_id: string,
		private login: string,
		private display_name: string,
		private type: string,
		private profile_image_url: string,
		private offline_image_url: string,
		private view_count: number,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {}

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

	toAnemic(): ViewerAnemic {
		return {
			id: this.id,
			user_id: this.user_id,
			login: this.login,
			display_name: this.display_name,
			type: this.type,
			profile_image_url: this.profile_image_url,
			offline_image_url: this.offline_image_url,
			view_count: this.view_count,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
			isUpdated: this.isUpdated(),
			isDeleted: this.isDeleted(),
		};
	}

	updateUserId(user_id: string): void {
		if (this.user_id !== user_id) {
			this.updated_at = new Date();
			this.user_id = user_id;
		}
	}

	updateLogin(login: string): void {
		if (this.login !== login) {
			this.updated_at = new Date();
			this.login = login;
		}
	}

	updateDisplayName(display_name: string): void {
		if (this.display_name !== display_name) {
			this.updated_at = new Date();
			this.display_name = display_name;
		}
	}

	updateType(type: string): void {
		if (this.type !== type) {
			this.updated_at = new Date();
			this.type = type;
		}
	}

	updateProfileImageUrl(profile_image_url: string): void {
		if (this.profile_image_url !== profile_image_url) {
			this.updated_at = new Date();
			this.profile_image_url = profile_image_url;
		}
	}

	updateOfflineImageUrl(offline_image_url: string): void {
		if (this.offline_image_url !== offline_image_url) {
			this.updated_at = new Date();
			this.offline_image_url = offline_image_url;
		}
	}

	updateViewCount(view_count: number): void {
		if (this.view_count !== view_count) {
			this.updated_at = new Date();
			this.view_count = view_count;
		}
	}
}
