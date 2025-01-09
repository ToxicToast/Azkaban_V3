import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

export interface UpdateCharacterDTO {
	gender?: Optional<Nullable<string>>;
	faction?: Optional<Nullable<string>>;
	race?: Optional<Nullable<string>>;
	character_class?: Optional<Nullable<string>>;
	active_spec?: Optional<Nullable<string>>;
	level?: Optional<number>;
	item_level?: Optional<number>;
	activated_at?: Optional<Nullable<Date>>;
	guild?: Optional<Nullable<string>>;
}
