import { AlertsService } from '../alerts.service';

export class TwitchAlertsService {
	constructor(private readonly service: AlertsService) {}

	onViewerTimeout(data: unknown): void {
		const eventData = data as { username: string };
		const message = `Viewer Timeout: ${eventData.username}`;
		const tags = ['azkaban', 'twitch', 'timeout'];
		this.service.sendAlert(message, tags);
	}

	onViewerBanned(data: unknown): void {
		const eventData = data as { username: string };
		const message = `Viewer Banned: ${eventData.username}`;
		const tags = ['azkaban', 'twitch', 'ban'];
		this.service.sendAlert(message, tags);
	}
}
