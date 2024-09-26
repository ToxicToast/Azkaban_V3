import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	TwitchBotTopics,
	RmqRecordBuilderHelper,
	TwitchViewerTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class TwitchVersionsService {
	constructor(
		@Inject('TWITCH_BOT_SERVICE') private readonly botClient: ClientProxy,
		@Inject('TWITCH_VIEWER_SERVICE')
		private readonly viewerClient: ClientProxy,
	) {}

	private async getBotVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.botClient
			.send(TwitchBotTopics.VERSION, payload)
			.toPromise();
	}

	private async getViewerVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.viewerClient
			.send(TwitchViewerTopics.VERSION, payload)
			.toPromise();
	}

	async getTwitchVersions() {
		const bot = await this.getBotVersion();
		const viewer = await this.getViewerVersion();
		//
		return {
			bot,
			viewer,
		};
	}
}
