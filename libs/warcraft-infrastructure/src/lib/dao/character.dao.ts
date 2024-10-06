import { Nullable } from '@toxictoast/azkaban-base-types';

export interface CharacterDAO {
	id: string;
	region: string;
	realm: string;
	name: string;
	gender: Nullable<string>;
	faction: Nullable<string>;
	race: Nullable<string>;
	character_class: Nullable<string>;
	active_spec: Nullable<string>;
	level: number;
	item_level: number;
	activated_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
	isActive: boolean;
	isUpdated: boolean;
	isDeleted: boolean;
}
