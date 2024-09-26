import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ViewerDAO {
	id: string;
	display_name: string;
	joins: number;
	parts: number;
	messages: number;
	timeouts: number;
	bans: number;
	minutes_watched: number;
	lastseen_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
	isUpdated: boolean;
	isDeleted: boolean;
}
