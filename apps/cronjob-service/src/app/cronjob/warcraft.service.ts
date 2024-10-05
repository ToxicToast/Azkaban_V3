import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	RmqRecordBuilderHelper,
	WarcraftApiTopics,
	WarcraftCharacterTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WarcraftService {
	constructor(
		@Inject('CHARACTER_SERVICE')
		private readonly characterClient: ClientProxy,
		@Inject('API_SERVICE')
		private readonly apiClient: ClientProxy,
	) {}

	// TODO: Add Warcraft Character DAO
	private async getAllCharacters(): Promise<Array<unknown>> {
		const payload = RmqRecordBuilderHelper({});
		return await this.characterClient
			.send(WarcraftCharacterTopics.LIST, payload)
			.toPromise();
	}

	// TODO: Add Warcraft API DAO
	private async checkWarcraftApi(
		server: string,
		name: string,
	): Promise<unknown> {
		const payload = RmqRecordBuilderHelper({
			server,
			name,
		});
		return await this.apiClient
			.send(WarcraftApiTopics.CHARACTER, payload)
			.toPromise();
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
		name: 'Update All Warcraft Characters',
	})
	async updateCharacters(): Promise<void> {
		const characters = await this.getAllCharacters();
		for (const character of characters) {
			Logger.debug({ character }, 'Updating character');
		}
	}
}
