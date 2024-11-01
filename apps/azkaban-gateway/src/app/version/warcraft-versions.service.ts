import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	RmqRecordBuilderHelper,
	WarcraftCharacterTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class WarcraftVersionsService {
	constructor(
		@Inject('WARCRAFT_CHARACTER_SERVICE')
		private readonly charactersClient: ClientProxy,
	) {}

	private async getCharactersVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.charactersClient
			.send(WarcraftCharacterTopics.VERSION, payload)
			.toPromise();
	}

	async getWarcraftVersions() {
		const character = await this.getCharactersVersion();
		//
		return {
			character,
		};
	}
}
