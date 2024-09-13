import { Inject, Injectable, Logger } from '@nestjs/common';
import { Bot } from '@toxictoast/azkaban-twitch-bot';
import {
	Events,
	JoinData,
	PartData,
	SubData,
} from '@toxictoast/azkaban-twitch-bot-events';
import { BotService } from './bot.service';
import { ClientProxy } from '@nestjs/microservices';
import { RmqRecordBuilderHelper } from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class ViewerService {
	private readonly toasty: Bot;
	private readonly viewerEvents: Array<Events> = [
		Events.JOIN,
		Events.PART,
		Events.SUB,
		Events.RESUB,
		Events.TIMEOUT,
		Events.BAN,
	];

	constructor(
		private readonly botService: BotService,
		@Inject('VIEWER_SERVICE') private readonly viewerClient: ClientProxy,
	) {
		this.toasty = this.botService.instance;
	}

	private async eventViewerJoin(data: JoinData): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			channel: data.channel,
			username: data.username,
		});
		Logger.debug(
			`ViewerService: eventViewerJoin: ${JSON.stringify(payload)}`,
		);
	}

	private async eventViewerPart(data: PartData): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			channel: data.channel,
			username: data.username,
		});
		Logger.debug(
			`ViewerService: eventViewerPart: ${JSON.stringify(payload)}`,
		);
	}

	private async eventViewerSub(data: SubData): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			channel: data.channel,
			username: data.username,
			subInfo: data.subInfo,
		});
		Logger.debug(
			`ViewerService: eventViewerSub: ${JSON.stringify(payload)}`,
		);
	}

	private onEventViewers(eventName: Events): void {
		this.toasty.addPlugin({
			name: `Viewer-${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`,
			event: eventName,
			execute: async (data: unknown) => {
				if (eventName === Events.JOIN) {
					await this.eventViewerJoin(data as JoinData);
				}
				if (eventName === Events.PART) {
					await this.eventViewerPart(data as PartData);
				}
				if (eventName === Events.SUB) {
					await this.eventViewerSub(data as SubData);
				}
			},
		});
	}

	initEvents(): void {
		this.viewerEvents.forEach((event: Events) => {
			this.onEventViewers(event);
		});
	}
}
