import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	RmqRecordBuilderHelper,
	WarcraftApiTopics,
	WarcraftCharacterTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Nullable } from '@toxictoast/azkaban-base-types';

@Injectable()
export class WarcraftService {
	constructor(
		@Inject('CHARACTER_SERVICE')
		private readonly characterClient: ClientProxy,
		@Inject('WARCRAFT_API_SERVICE')
		private readonly apiClient: ClientProxy,
	) {}

	// TODO: Add Warcraft Character DAO
	private async getAllCharacters(): Promise<Array<unknown>> {
		try {
			const payload = RmqRecordBuilderHelper({});
			return await this.characterClient
				.send(WarcraftCharacterTopics.LIST, payload)
				.toPromise();
		} catch (e) {
			Logger.error(e);
			return [];
		}
	}

	// TODO: Add Warcraft API DAO
	private async checkWarcraftApi(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<unknown>> {
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
			Logger.error(e);
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
				Logger.debug({ character }, 'Updating character');
			}
		} catch (e) {
			Logger.error(e);
		}
	}
}
