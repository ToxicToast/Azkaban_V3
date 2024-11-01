import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	RmqRecordBuilderHelper,
	WarcraftApiTopics,
	WarcraftCharacterTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { CharacterDAO } from '@azkaban/warcraft-infrastructure';

@Injectable()
export class WarcraftService {
	constructor(
		@Inject('CHARACTER_SERVICE')
		private readonly characterClient: ClientProxy,
		@Inject('WARCRAFT_API_SERVICE')
		private readonly apiClient: ClientProxy,
	) {}

	private async getAllCharacters(): Promise<Array<CharacterDAO>> {
		try {
			const payload = RmqRecordBuilderHelper({});
			return await this.characterClient
				.send(WarcraftCharacterTopics.LIST, payload)
				.toPromise();
		} catch (e) {
			return [];
		}
	}

	private async checkWarcraftApi(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<CharacterDAO>> {
		try {
			const payload = RmqRecordBuilderHelper({
				region,
				realm,
				name,
			});
			return await this.apiClient
				.send(WarcraftApiTopics.CHARACTER, payload)
				.toPromise();
		} catch (e) {
			return null;
		}
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
		name: 'Update All Warcraft Characters',
	})
	async updateCharacters(): Promise<void> {
		try {
			const characters = await this.getAllCharacters();
			for (const character of characters) {
				const apiCharacter = await this.checkWarcraftApi(
					character.region,
					character.realm,
					character.name,
				);
				if (apiCharacter) {
					const payload = RmqRecordBuilderHelper({
						id: character.id,
						gender: apiCharacter.gender,
						faction: apiCharacter.faction,
						race: apiCharacter.race,
						character_class: apiCharacter.character_class,
						active_spec: apiCharacter.active_spec,
						level: apiCharacter.level,
						item_level: apiCharacter.item_level,
					});
					await this.characterClient
						.send(WarcraftCharacterTopics.UPDATE, payload)
						.toPromise();
				} else {
					const payload = RmqRecordBuilderHelper({
						id: character.id,
					});
					await this.characterClient
						.send(WarcraftCharacterTopics.DELETE, payload)
						.toPromise();
				}
			}
		} catch (e) {
			Logger.error(e);
		}
	}
}
