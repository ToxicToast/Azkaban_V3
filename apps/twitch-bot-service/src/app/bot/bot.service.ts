import { Inject, Injectable } from '@nestjs/common';
import { Bot } from '@toxictoast/azkaban-twitch-bot';
import { Events } from '@toxictoast/azkaban-twitch-bot-events';
import {
	NotifyTopics,
	RmqRecordBuilderHelper,
	TwitchMessageTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { ClientProxy, RmqRecord } from '@nestjs/microservices';

@Injectable()
export class BotService {
	private readonly toasty: Bot;

	constructor(
		@Inject('TWITCH_USER_ID') private readonly userId: string,
		@Inject('TWITCH_CLIENT_ID') private readonly clientId: string,
		@Inject('TWITCH_CLIENT_SECRET') private readonly clientSecret: string,
		@Inject('TWITCH_ACCESS_TOKEN') private readonly accessToken: string,
		@Inject('TWITCH_REFRESH_TOKEN') private readonly refreshToken: string,
		@Inject('TWITCH_CHANNELS') private readonly channels: string,
		@Inject('BOT_LOGGING') private readonly logging: boolean,
		@Inject('NOTIFY_SERVICE') private readonly notifyClient: ClientProxy,
		@Inject('MESSAGES_SERVICE')
		private readonly messagesClient: ClientProxy,
	) {
		this.toasty = new Bot({
			logging: this.logging,
			authentication: {
				userId: this.userId,
				clientId: this.clientId,
				clientSecret: this.clientSecret,
				accessToken: this.accessToken,
				refreshToken: this.refreshToken,
			},
			channels: this.channels.split(','),
		});
	}

	private async eventNotification(data: RmqRecord<unknown>): Promise<void> {
		await this.notifyClient.emit(NotifyTopics.NOTIFY, data).toPromise();
	}

	private async eventMessage(eventName: Events, data: RmqRecord<unknown>) {
		if (eventName === Events.MESSAGE) {
			await this.messagesClient
				.emit(TwitchMessageTopics.CREATE, data)
				.toPromise();
		}
		if (eventName === Events.MESSAGEREMOVE) {
			await this.messagesClient
				.emit(TwitchMessageTopics.DELETE, data)
				.toPromise();
		}
	}

	onEvent(eventName: Events): void {
		this.toasty.addPlugin({
			name: `Broker-${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`,
			event: eventName,
			execute: async (data: unknown) => {
				const payload = RmqRecordBuilderHelper(data);
				await this.eventNotification(payload);
				await this.eventMessage(eventName, payload);
			},
		});
	}

	startBot(): void {
		this.toasty.initBot();
	}

	stopBot(): void {
		this.toasty.stopBot();
	}
}
