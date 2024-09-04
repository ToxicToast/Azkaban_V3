import { Inject, Injectable } from '@nestjs/common';
import { Bot } from '@toxictoast/azkaban-twitch-bot';
import {
	Events,
	MessageData,
	MessageRemoveData,
} from '@toxictoast/azkaban-twitch-bot-events';
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

	private async eventNotification(
		eventName: string,
		data: unknown,
	): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			service: 'twitch-bot-service',
			event: eventName,
			data,
		});
		await this.notifyClient.emit(NotifyTopics.NOTIFY, payload).toPromise();
	}

	private async eventMessage(eventName: Events, data: unknown) {
		if (eventName === Events.MESSAGE) {
			const messageData = data as MessageData;
			const payload = RmqRecordBuilderHelper({
				channel: messageData.channel,
				username: messageData.username,
				message: messageData.message,
				args: {
					messageId: messageData.args.id,
					channelId: messageData.args.channelId,
					isFirst: messageData.args.isFirst,
					isReply: messageData.args.isReply,
					isRedemption: messageData.args.isRedemption,
					isCheer: messageData.args.isCheer,
					isHighlight: messageData.args.isHighlight,
					isReturningChatter: messageData.args.isReturningChatter,
				},
				userInfo: {
					userId: messageData.args.userInfo.userId,
					color: messageData.args.userInfo.color,
					isBroadcaster: messageData.args.userInfo.isBroadcaster,
					isVip: messageData.args.userInfo.isVip,
					isMod: messageData.args.userInfo.isMod,
					isSubscriber: messageData.args.userInfo.isSubscriber,
					isArtist: messageData.args.userInfo.isArtist,
					isFounder: messageData.args.userInfo.isFounder,
					userName: messageData.args.userInfo.userName,
					userType: messageData.args.userInfo.userType,
				},
			});
			await this.messagesClient
				.emit(TwitchMessageTopics.CREATE, payload)
				.toPromise();
		}
		if (eventName === Events.MESSAGEREMOVE) {
			const messageRemoveData = data as MessageRemoveData;
			const payload = RmqRecordBuilderHelper({
				messageId: messageRemoveData.messageId,
			});
			await this.messagesClient
				.emit(TwitchMessageTopics.DELETE, payload)
				.toPromise();
		}
	}

	onEvent(eventName: Events): void {
		this.toasty.addPlugin({
			name: `Broker-${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`,
			event: eventName,
			execute: async (data: unknown) => {
				await this.eventMessage(eventName, data);
			},
		});
	}

	onEventNotify(eventName: Events): void {
		this.toasty.addPlugin({
			name: `Notify-${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`,
			event: eventName,
			execute: async (data: unknown) => {
				await this.eventNotification('twitch_bot_' + eventName, data);
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
