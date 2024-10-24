import { Inject, Injectable } from '@nestjs/common';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import {
	WarcraftClassesHelper,
	WarcraftRacesHelper,
	WarcraftSpecsHelper,
} from '@toxictoast/azkaban-base-helpers';
import { Repository } from 'typeorm';
import {
	CharacterDAO,
	CharacterEntity,
	CharacterRepository,
	CharacterService as BaseService,
} from '@azkaban/warcraft-infrastructure';

@Injectable()
export class CharacterService {
	private readonly infrastructureRepository: CharacterRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('CHARACTER_REPOSITORY')
		private readonly characterRepository: Repository<CharacterEntity>,
	) {
		this.infrastructureRepository = new CharacterRepository(
			this.characterRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

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

	async getList(limit: number, offset: number): Promise<Array<CharacterDAO>> {
		return await this.infrastructureService.getCharacterList(limit, offset);
	}

	async getById(id: string): Promise<CharacterDAO> {
		return await this.infrastructureService.getCharacterById(id);
	}

	async getByUserId(user_id: Nullable<string>): Promise<Array<CharacterDAO>> {
		return await this.infrastructureService.getCharacterByUserId(user_id);
	}

	async createCharacter(
		region: string,
		realm: string,
		name: string,
	): Promise<CharacterDAO> {
		return await this.infrastructureService.createCharacter({
			region,
			realm,
			name,
		});
	}

	async updateCharacter(
		id: string,
		user_id?: Optional<Nullable<string>>,
		gender?: Optional<string>,
		faction?: Optional<string>,
		race?: Optional<number>,
		character_class?: Optional<number>,
		active_spec?: Optional<number>,
		level?: Optional<number>,
		item_level?: Optional<number>,
	): Promise<CharacterDAO> {
		if (user_id !== undefined) {
			await this.infrastructureService.updateUserId(id, user_id);
		}
		if (gender !== undefined) {
			const realGender = this.toGenderString(gender);
			await this.infrastructureService.updateGender(id, realGender);
		}
		if (faction !== undefined) {
			const realFaction = this.toFactionString(faction);
			await this.infrastructureService.updateFaction(id, realFaction);
		}
		if (race !== undefined) {
			const realRace = this.toRaceString(race);
			await this.infrastructureService.updateRace(id, realRace);
		}
		if (character_class !== undefined) {
			const realClass = this.toClassString(character_class);
			await this.infrastructureService.updateCharacterClass(
				id,
				realClass,
			);
		}
		if (active_spec !== undefined) {
			const realSpec = this.toSpecString(active_spec);
			await this.infrastructureService.updateActiveSpec(id, realSpec);
		}
		if (level !== undefined) {
			await this.infrastructureService.updateLevel(id, level);
		}
		if (item_level !== undefined) {
			await this.infrastructureService.updateItemLevel(id, item_level);
		}
		return await this.infrastructureService.getCharacterById(id);
	}

	async deleteCharacter(id: string): Promise<CharacterDAO> {
		return await this.infrastructureService.deleteCharacter(id);
	}

	async restoreCharacter(id: string): Promise<CharacterDAO> {
		return await this.restoreCharacter(id);
	}
}
