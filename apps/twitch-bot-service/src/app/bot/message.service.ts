import { Inject, Injectable } from '@nestjs/common';
import { BotService } from './bot.service';
import { Bot } from '@toxictoast/azkaban-twitch-bot';
import { ClientProxy } from '@nestjs/microservices';
import {
	RmqRecordBuilderHelper,
	TwitchMessageTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';
import {
	Events,
	MessageData,
	MessageRemoveData,
} from '@toxictoast/azkaban-twitch-bot-events';

@Injectable()
export class MessageService {
	private readonly toasty: Bot;
	private readonly messageEvents: Array<Events> = [
		Events.MESSAGE,
		Events.MESSAGEREMOVE,
	];

	constructor(
		private readonly botService: BotService,
		@Inject('MESSAGES_SERVICE')
		private readonly messagesClient: ClientProxy,
	) {
		this.toasty = this.botService.instance;
	}

	private async eventMessageAdd(data: MessageData): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			channel: data.channel,
			username: data.username,
			message: data.message,
			args: {
				message_id: data.args.id,
				channelId: data.args.channelId,
				isFirst: data.args.isFirst,
				isReply: data.args.isReply,
				isRedemption: data.args.isRedemption,
				isCheer: data.args.isCheer,
				isHighlight: data.args.isHighlight,
				isReturningChatter: data.args.isReturningChatter,
			},
			userInfo: {
				userId: data.args.userInfo.userId,
				color: data.args.userInfo.color,
				isBroadcaster: data.args.userInfo.isBroadcaster,
				isVip: data.args.userInfo.isVip,
				isMod: data.args.userInfo.isMod,
				isSubscriber: data.args.userInfo.isSubscriber,
				isArtist: data.args.userInfo.isArtist,
				isFounder: data.args.userInfo.isFounder,
				userName: data.args.userInfo.userName,
				userType: data.args.userInfo.userType,
			},
		});
		await this.messagesClient
			.emit(TwitchMessageTopics.CREATE, payload)
			.toPromise();
	}

	private async eventMessageRemove(data: MessageRemoveData): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			message_id: data.messageId,
		});
		await this.messagesClient
			.emit(TwitchMessageTopics.DELETE, payload)
			.toPromise();
	}

	private onEventMessage(eventName: Events): void {
		this.toasty.addPlugin({
			name: `Message-${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`,
			event: eventName,
			execute: async (data: unknown) => {
				if (eventName === Events.MESSAGE) {
					await this.eventMessageAdd(data as MessageData);
				}
				if (eventName === Events.MESSAGEREMOVE) {
					await this.eventMessageRemove(data as MessageRemoveData);
				}
			},
		});
	}

	initEvents(): void {
		this.messageEvents.forEach((event: Events) => {
			this.onEventMessage(event);
		});
	}
}
