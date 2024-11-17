import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiDAO, CharacterDAO } from '@azkaban/warcraft-infrastructure';
import {
	RmqRecordBuilderHelper,
	WarcraftApiTopics,
	WarcraftCharacterTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable } from '@toxictoast/azkaban-base-types';

@Injectable()
export class WarcraftService {
	constructor(
		@Inject('CHARACTER_SERVICE')
		private readonly characterClient: ClientProxy,
		@Inject('API_SERVICE')
		private readonly apiClient: ClientProxy,
	) {}

	async getAllCharacters(): Promise<Array<CharacterDAO>> {
		try {
			const payload = RmqRecordBuilderHelper({});
			return await this.characterClient
				.send(WarcraftCharacterTopics.LIST, payload)
				.toPromise();
		} catch (error) {
			return [];
		}
	}

	async getCharacterFromAPI(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<ApiDAO>> {
		try {
			const payload = RmqRecordBuilderHelper({
				region,
				realm,
				name,
			});
			return await this.apiClient
				.send(WarcraftApiTopics.CHARACTER, payload)
				.toPromise();
		} catch (error) {
			return null;
		}
	}

	async updateCharacter(
		id: string,
		character: ApiDAO,
	): Promise<Nullable<CharacterDAO>> {
		try {
			const payload = RmqRecordBuilderHelper({
				id,
				gender: character.gender.name,
				faction: character.faction.name,
				race: character.race.id,
				character_class: character.character_class.id,
				active_spec: character.active_spec.id,
				level: character.level,
				item_level: character.equipped_item_level,
			});
			return await this.characterClient
				.send(WarcraftCharacterTopics.UPDATE, payload)
				.toPromise();
		} catch (error) {
			return null;
		}
	}

	async deleteCharacter(id: string): Promise<CharacterDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.characterClient
			.send(WarcraftCharacterTopics.DELETE, payload)
			.toPromise();
	}

	async restoreCharacter(id: string): Promise<CharacterDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.characterClient
			.send(WarcraftCharacterTopics.RESTORE, payload)
			.toPromise();
	}
}
