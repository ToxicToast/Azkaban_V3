import { Injectable } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class CharacterService {
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
	): Promise<unknown> {
		if (gender !== undefined) {
			// TODO: Update Character Gender
		}
		if (faction !== undefined) {
			// TODO: Update Character Faction
		}
		if (race !== undefined) {
			// TODO: Update Character Race
		}
		if (character_class !== undefined) {
			// TODO: Update Character Class
		}
		if (active_spec !== undefined) {
			// TODO: Update Character Spec
		}
		if (guild !== undefined) {
			// TODO: Update Character Guild
		}
		if (level !== undefined) {
			// TODO: Update Character Level
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
