import { Domain } from '@toxictoast/azkaban-base-domain';
import { CharacterAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class CharacterAggregate implements Domain<CharacterAnemic> {
	constructor(
		private readonly id: string,
		private user_id: Nullable<string>,
		private readonly region: string,
		private readonly realm: string,
		private readonly name: string,
		private gender: Nullable<string>,
		private faction: Nullable<string>,
		private race: Nullable<string>,
		private character_class: Nullable<string>,
		private active_spec: Nullable<string>,
		private level: number,
		private item_level: number,
		private activated_at: Nullable<Date>,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {}

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

	toAnemic(): CharacterAnemic {
		return {
			id: this.id,
			user_id: this.user_id,
			region: this.region,
			realm: this.realm,
			name: this.name,
			gender: this.gender,
			faction: this.faction,
			race: this.race,
			character_class: this.character_class,
			active_spec: this.active_spec,
			level: this.level,
			item_level: this.item_level,
			activated_at: this.activated_at,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
			isActive: this.isActive(),
			isUpdated: this.isUpdated(),
			isDeleted: this.isDeleted(),
		};
	}

	updateUserId(user_id: Nullable<string>): void {
		if (user_id !== this.user_id) {
			this.updated_at = new Date();
			this.user_id = user_id;
		}
	}

	updateActivatedAt(activated_at: Nullable<Date>): void {
		if (activated_at !== this.activated_at) {
			this.updated_at = new Date();
			this.activated_at = activated_at;
		}
	}

	updateGender(gender: Nullable<string>): void {
		if (gender !== this.gender) {
			this.updated_at = new Date();
			this.gender = gender;
		}
	}

	updateFaction(faction: Nullable<string>): void {
		if (faction !== this.faction) {
			this.updated_at = new Date();
			this.faction = faction;
		}
	}

	updateRace(race: Nullable<string>): void {
		if (race !== this.race) {
			this.updated_at = new Date();
			this.race = race;
		}
	}

	updateCharacterClass(character_class: Nullable<string>): void {
		if (character_class !== this.character_class) {
			this.updated_at = new Date();
			this.character_class = character_class;
		}
	}

	updateActiveSpec(active_spec: Nullable<string>): void {
		if (active_spec !== this.active_spec) {
			this.updated_at = new Date();
			this.active_spec = active_spec;
		}
	}

	updateLevel(level: number): void {
		if (level !== this.level) {
			this.updated_at = new Date();
			this.level = level;
		}
	}

	updateItemLevel(item_level: number): void {
		if (item_level !== this.item_level) {
			this.updated_at = new Date();
			this.item_level = item_level;
		}
	}
}
