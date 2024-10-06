import { Injectable } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';
import {
	WarcraftClassesHelper,
	WarcraftRacesHelper,
	WarcraftSpecsHelper,
} from '@toxictoast/azkaban-base-helpers';

@Injectable()
export class CharacterService {
	private toGenderString(gender: string): string {
		return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
	}

	private toFactionString(faction: string): string {
		return faction.charAt(0).toUpperCase() + faction.slice(1).toLowerCase();
	}

	private toRaceString(raceId: number): string {
		return WarcraftRacesHelper(raceId);
	}

	private toClassString(classId: number): string {
		return WarcraftClassesHelper(classId);
	}

	private toSpecString(specId: number): string {
		return WarcraftSpecsHelper(specId);
	}

	// TODO: Add Character DAO & Implementation
	async getList(limit: number, offset: number): Promise<Array<unknown>> {
		return [];
	}

	// TODO: Add Character DAO & Implementation
	async getById(id: string): Promise<unknown> {
		return {};
	}

	// TODO: Add Character DAO & Implementation
	async createCharacter(
		region: string,
		realm: string,
		name: string,
	): Promise<unknown> {
		return {};
	}

	// TODO: Add Character DAO & Implementation
	async updateCharacter(
		id: string,
		gender?: Optional<string>,
		faction?: Optional<string>,
		race?: Optional<number>,
		character_class?: Optional<number>,
		active_spec?: Optional<number>,
		guild?: Optional<string>,
		level?: Optional<number>,
		item_level?: Optional<number>,
	): Promise<unknown> {
		if (gender !== undefined) {
			const realGender = this.toGenderString(gender);
			// TODO: Update Character Gender
		}
		if (faction !== undefined) {
			const realFaction = this.toFactionString(faction);
			// TODO: Update Character Faction
		}
		if (race !== undefined) {
			const realRace = this.toRaceString(race);
			// TODO: Update Character Race
		}
		if (character_class !== undefined) {
			const realClass = this.toClassString(character_class);
			// TODO: Update Character Class
		}
		if (active_spec !== undefined) {
			const realSpec = this.toSpecString(active_spec);
			// TODO: Update Character Spec
		}
		if (guild !== undefined) {
			// TODO: Update Character Guild
		}
		if (level !== undefined) {
			// TODO: Update Character Level
		}
		if (item_level !== undefined) {
			// TODO: Update Character Item Level
		}
		return {};
	}

	// TODO: Add Character DAO & Implementation
	async deleteCharacter(id: string): Promise<unknown> {
		return {};
	}

	// TODO: Add Character DAO & Implementation
	async restoreCharacter(id: string): Promise<unknown> {
		return {};
	}
}
