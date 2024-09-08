import { Inject, Injectable } from '@nestjs/common';
import { BotService } from './bot.service';
import { Bot } from '@toxictoast/azkaban-twitch-bot';
import { ClientProxy } from '@nestjs/microservices';
import {
	NotifyTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Events } from '@toxictoast/azkaban-twitch-bot-events';

@Injectable()
export class NotifyService {
	private readonly toasty: Bot;
	private readonly notifyEvents: Array<Events> = [
		Events.JOIN,
		Events.PART,
		Events.MESSAGE,
		Events.TIMEOUT,
		Events.BAN,
		Events.SUB,
		Events.RESUB,
		Events.SUBGIFT,
		Events.SUBEXTEND,
		Events.COMMUNITYSUB,
	];

	constructor(
		private readonly botService: BotService,
		@Inject('NOTIFY_SERVICE') private readonly notifyClient: ClientProxy,
	) {
		this.toasty = this.botService.instance;
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

	private onEventNotify(eventName: Events): void {
		this.toasty.addPlugin({
			name: `Notify-${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`,
			event: eventName,
			execute: async (data: unknown) => {
				await this.eventNotification('twitch_bot_' + eventName, data);
			},
		});
	}

	initEvents(): void {
		this.notifyEvents.forEach((event) => {
			this.onEventNotify(event);
		});
	}
}
