import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	TwitchBotTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class TwitchVersionsService {
	constructor(
		@Inject('TWITCH_BOT_SERVICE') private readonly botClient: ClientProxy,
	) {}

	private async getBotVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.botClient
			.send(TwitchBotTopics.VERSION, payload)
			.toPromise();
	}

	async getTwitchVersions() {
		const bot = await this.getBotVersion();
		//
		return {
			bot,
		};
	}
}
