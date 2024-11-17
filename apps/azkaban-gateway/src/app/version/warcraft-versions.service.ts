import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	RmqRecordBuilderHelper,
	WarcraftApiTopics,
	WarcraftCharacterTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class WarcraftVersionsService {
	constructor(
		@Inject('WARCRAFT_CHARACTER_SERVICE')
		private readonly charactersClient: ClientProxy,
		@Inject('WARCRAFT_API_SERVICE')
		private readonly apiClient: ClientProxy,
	) {}

	private async getCharactersVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.charactersClient
			.send(WarcraftCharacterTopics.VERSION, payload)
			.toPromise();
	}

	private async getApiVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.apiClient
			.send(WarcraftApiTopics.VERSION, payload)
			.toPromise();
	}

	async getWarcraftVersions() {
		const character = await this.getCharactersVersion();
		const api = await this.getApiVersion();
		//
		return {
			character,
			api,
		};
	}
}
