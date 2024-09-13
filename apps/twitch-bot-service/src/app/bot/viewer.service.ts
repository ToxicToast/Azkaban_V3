import { Inject, Injectable, Logger } from '@nestjs/common';
import { Bot } from '@toxictoast/azkaban-twitch-bot';
import {
	BanData,
	Events,
	JoinData,
	PartData,
	ResubData,
	SubData,
	TimeoutData,
} from '@toxictoast/azkaban-twitch-bot-events';
import { BotService } from './bot.service';
import { ClientProxy } from '@nestjs/microservices';
import {
	RmqRecordBuilderHelper,
	TwitchViewerTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

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
		await this.viewerClient
			.emit(TwitchViewerTopics.JOIN, payload)
			.toPromise();
	}

	private async eventViewerPart(data: PartData): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			channel: data.channel,
			username: data.username,
		});
		await this.viewerClient
			.emit(TwitchViewerTopics.PART, payload)
			.toPromise();
	}

	private async eventViewerSub(data: SubData): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			channel: data.channel,
			username: data.username,
			subInfo: data.subInfo,
		});
		await this.viewerClient
			.emit(TwitchViewerTopics.SUB, payload)
			.toPromise();
	}

	private async eventViewerReSub(data: ResubData): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			channel: data.channel,
			username: data.username,
			subInfo: data.subInfo,
		});
		await this.viewerClient
			.emit(TwitchViewerTopics.RESUB, payload)
			.toPromise();
	}

	private async eventViewerTimeout(data: TimeoutData): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			channel: data.channel,
			username: data.username,
			duration: data.duration,
		});
		await this.viewerClient
			.emit(TwitchViewerTopics.TIMEOUT, payload)
			.toPromise();
	}

	private async eventViewerBan(data: BanData): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			channel: data.channel,
			username: data.username,
		});
		await this.viewerClient
			.emit(TwitchViewerTopics.BAN, payload)
			.toPromise();
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
				if (eventName === Events.RESUB) {
					await this.eventViewerReSub(data as ResubData);
				}
				if (eventName === Events.TIMEOUT) {
					await this.eventViewerTimeout(data as TimeoutData);
				}
				if (eventName === Events.BAN) {
					await this.eventViewerBan(data as BanData);
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
