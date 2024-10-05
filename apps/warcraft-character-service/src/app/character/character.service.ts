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
		level?: Optional<number>,
	): Promise<unknown> {
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
