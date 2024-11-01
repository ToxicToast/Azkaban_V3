import { CharacterService as DomainService } from '@azkaban/warcraft-domain';
import { CharacterRepository } from '../repositories';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CharacterDAO } from '../../dao';
import { CreateCharacterDTO } from '../../dto';

export class CharacterService {
	private readonly domainService: DomainService;

	constructor(private readonly repository: CharacterRepository) {
		this.domainService = new DomainService(repository);
	}

	async getCharacterList(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharacters(limit, offset);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getCharacterById(id: string): Promise<CharacterDAO> {
		const result = await this.domainService.getCharacterById(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getCharacterByUserId(
		user_id: Nullable<string>,
	): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharacterByUserId(user_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async createCharacter(data: CreateCharacterDTO): Promise<CharacterDAO> {
		const result = await this.domainService.createCharacter(data);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateUserId(
		id: string,
		user_id: Nullable<string>,
	): Promise<CharacterDAO> {
		const result = await this.domainService.updateUserId(id, user_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async updateGender(
		id: string,
		gender: Nullable<string>,
	): Promise<CharacterDAO> {
		const result = await this.domainService.updateGender(id, gender);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async updateFaction(
		id: string,
		faction: Nullable<string>,
	): Promise<CharacterDAO> {
		const result = await this.domainService.updateFaction(id, faction);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async updateRace(
		id: string,
		race: Nullable<string>,
	): Promise<CharacterDAO> {
		const result = await this.domainService.updateRace(id, race);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async updateCharacterClass(
		id: string,
		character_class: Nullable<string>,
	): Promise<CharacterDAO> {
		const result = await this.domainService.updateCharacterClass(
			id,
			character_class,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async updateActiveSpec(
		id: string,
		active_spec: Nullable<string>,
	): Promise<CharacterDAO> {
		const result = await this.domainService.updateActiveSpec(
			id,
			active_spec,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async updateLevel(id: string, level: number): Promise<CharacterDAO> {
		const result = await this.domainService.updateLevel(id, level);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async updateItemLevel(
		id: string,
		item_level: number,
	): Promise<CharacterDAO> {
		const result = await this.domainService.updateItemLevel(id, item_level);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async updateActivatedAt(
		id: string,
		activated_at: Nullable<Date>,
	): Promise<CharacterDAO> {
		const result = await this.domainService.updateActivatedAt(
			id,
			activated_at,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async deleteCharacter(id: string): Promise<CharacterDAO> {
		const result = await this.domainService.deleteCharacter(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async restoreCharacter(id: string): Promise<CharacterDAO> {
		const result = await this.domainService.restoreCharacter(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}
}
