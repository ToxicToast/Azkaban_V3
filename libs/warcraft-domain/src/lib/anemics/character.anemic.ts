import { Anemic } from '@toxictoast/azkaban-base-domain';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface CharacterAnemic extends Anemic {
	readonly region: string;
	readonly realm: string;
	readonly name: string;
	readonly gender: Nullable<string>;
	readonly faction: Nullable<string>;
	readonly race: Nullable<string>;
	readonly character_class: Nullable<string>;
	readonly active_spec: Nullable<string>;
	readonly level: number;
	readonly item_level: number;
	readonly activated_at: Nullable<Date>;
	readonly isActive: boolean;
}
