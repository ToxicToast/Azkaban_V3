import { Anemic } from '@toxictoast/azkaban-base-domain';

export interface ViewerAnemic extends Anemic {
	readonly user_id: string;
	readonly login: string;
	readonly display_name: string;
	readonly type: string;
	readonly profile_image_url: string;
	readonly offline_image_url: string;
	readonly view_count: number;
}
