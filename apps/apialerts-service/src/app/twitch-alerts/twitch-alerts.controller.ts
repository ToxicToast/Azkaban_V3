import { Controller } from '@nestjs/common';
import { TwitchAlertsService } from './twitch-alerts.service';
import { EventPattern } from '@nestjs/microservices';
import {
	TwitchViewerTopics,
	NotifyTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Controller('alerts/twitch')
export class TwitchAlertsController {
	constructor(private readonly twitchAlerts: TwitchAlertsService) {}

	@EventPattern(NotifyTopics.APIALERTS)
	onApiAlertsEvent(alert: { event: string; data: unknown }): void {
		this.onViewerTimeout(alert);
		this.onViewerBanned(alert);
	}

	private onViewerTimeout(alert: { event: string; data: unknown }): void {
		const { event, data } = alert;
		if (event === TwitchViewerTopics.TIMEOUT) {
			this.twitchAlerts.onViewerTimeout(data);
		}
		return null;
	}

	private onViewerBanned(alert: { event: string; data: unknown }): void {
		const { event, data } = alert;
		if (event === TwitchViewerTopics.BAN) {
			this.twitchAlerts.onViewerBanned(data);
		}
		return null;
	}
}
