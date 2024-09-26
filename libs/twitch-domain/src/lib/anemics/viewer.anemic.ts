import { Anemic } from '@toxictoast/azkaban-base-domain';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ViewerAnemic extends Anemic {
	readonly display_name: string;
	readonly lastseen_at: Nullable<Date>;
	readonly joins: number;
	readonly parts: number;
	readonly messages: number;
	readonly timeouts: number;
	readonly bans: number;
	readonly minutes_watched: number;
}
