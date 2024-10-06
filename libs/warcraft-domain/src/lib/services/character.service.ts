import { CharacterAnemic } from '../anemics';
import { CharacterFactory } from '../factories';
import { CharacterRepository } from '../repositories';
import { CharacterData } from '../data';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { GenericErrorCodes } from '@toxictoast/azkaban-base-helpers';

export class CharacterService {
	private readonly factory: CharacterFactory = new CharacterFactory();

	constructor(private readonly repository: CharacterRepository) {}

	private async save(
		anemic: CharacterAnemic,
	): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<CharacterAnemic>(result);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async getCharacters(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findList(limit, offset);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error);
		}
	}

	async getCharacterById(id: string): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.repository.findById(id);
			if (result !== null) {
				return Result.ok<CharacterAnemic>(result);
			}
			return Result.fail<CharacterAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async getCharacterByRegionRealmName(
		region: string,
		realm: string,
		name: string,
	): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.repository.findByRegionRealmName(
				region,
				realm,
				name,
			);
			if (result !== null) {
				return Result.ok<CharacterAnemic>(result);
			}
			return Result.fail<CharacterAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async createCharacter(
		data: CharacterData,
	): Promise<Result<CharacterAnemic>> {
		try {
			const check = await this.getCharacterByRegionRealmName(
				data.region,
				data.realm,
				data.name,
			);
			if (check.isSuccess) {
				return Result.fail<CharacterAnemic>(GenericErrorCodes.UNKNOWN);
			}
			const aggregate = this.factory.createDomain(data);
			return await this.save(aggregate.toAnemic());
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async deleteCharacter(id: string): Promise<Result<CharacterAnemic>> {
		try {
			const character = await this.getCharacterById(id);
			if (character.isSuccess) {
				const characterValue = character.value;
				const aggregate = this.factory.reconstitute(characterValue);
				aggregate.delete();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async restoreCharacter(id: string): Promise<Result<CharacterAnemic>> {
		try {
			const character = await this.getCharacterById(id);
			if (character.isSuccess) {
				const characterValue = character.value;
				const aggregate = this.factory.reconstitute(characterValue);
				aggregate.restore();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async updateGender(
		id: string,
		gender: Nullable<string>,
	): Promise<Result<CharacterAnemic>> {
		try {
			const character = await this.getCharacterById(id);
			if (character.isSuccess) {
				const characterValue = character.value;
				const aggregate = this.factory.reconstitute(characterValue);
				aggregate.updateGender(gender);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async updateFaction(
		id: string,
		faction: Nullable<string>,
	): Promise<Result<CharacterAnemic>> {
		try {
			const character = await this.getCharacterById(id);
			if (character.isSuccess) {
				const characterValue = character.value;
				const aggregate = this.factory.reconstitute(characterValue);
				aggregate.updateFaction(faction);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async updateRace(
		id: string,
		race: Nullable<string>,
	): Promise<Result<CharacterAnemic>> {
		try {
			const character = await this.getCharacterById(id);
			if (character.isSuccess) {
				const characterValue = character.value;
				const aggregate = this.factory.reconstitute(characterValue);
				aggregate.updateRace(race);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async updateCharacterClass(
		id: string,
		character_class: Nullable<string>,
	): Promise<Result<CharacterAnemic>> {
		try {
			const character = await this.getCharacterById(id);
			if (character.isSuccess) {
				const characterValue = character.value;
				const aggregate = this.factory.reconstitute(characterValue);
				aggregate.updateCharacterClass(character_class);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async updateActiveSpec(
		id: string,
		active_spec: Nullable<string>,
	): Promise<Result<CharacterAnemic>> {
		try {
			const character = await this.getCharacterById(id);
			if (character.isSuccess) {
				const characterValue = character.value;
				const aggregate = this.factory.reconstitute(characterValue);
				aggregate.updateActiveSpec(active_spec);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async updateLevel(
		id: string,
		level: number,
	): Promise<Result<CharacterAnemic>> {
		try {
			const character = await this.getCharacterById(id);
			if (character.isSuccess) {
				const characterValue = character.value;
				const aggregate = this.factory.reconstitute(characterValue);
				aggregate.updateLevel(level);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async updateItemLevel(
		id: string,
		item_level: number,
	): Promise<Result<CharacterAnemic>> {
		try {
			const character = await this.getCharacterById(id);
			if (character.isSuccess) {
				const characterValue = character.value;
				const aggregate = this.factory.reconstitute(characterValue);
				aggregate.updateItemLevel(item_level);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}

	async updateActivatedAt(
		id: string,
		activated_at: Nullable<Date>,
	): Promise<Result<CharacterAnemic>> {
		try {
			const character = await this.getCharacterById(id);
			if (character.isSuccess) {
				const characterValue = character.value;
				const aggregate = this.factory.reconstitute(characterValue);
				aggregate.updateActivatedAt(activated_at);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error);
		}
	}
}
