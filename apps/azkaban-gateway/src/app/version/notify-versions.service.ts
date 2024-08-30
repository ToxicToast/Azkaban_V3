import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	NotifyTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class NotifyVersionsService {
	constructor(
		@Inject('WEBHOOKS_SERVICE') private readonly hooksClient: ClientProxy,
		@Inject('APIALERTS_SERVICE')
		private readonly apialertsClient: ClientProxy,
		@Inject('NOTIFICATIONS_SERVICE')
		private readonly notificationsClient: ClientProxy,
		@Inject('SSE_SERVICE') private readonly sseClient: ClientProxy,
	) {}

	private async getWebhooksVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.hooksClient
			.send(NotifyTopics.VERSION, payload)
			.toPromise();
	}

	private async getApiAlertsVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.apialertsClient
			.send(NotifyTopics.VERSION, payload)
			.toPromise();
	}

	private async getNotificationsVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.notificationsClient
			.send(NotifyTopics.VERSION, payload)
			.toPromise();
	}

	private async getSSEVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.sseClient
			.send(NotifyTopics.VERSION, payload)
			.toPromise();
	}

	async getNotifyVersions() {
		const webhooks = await this.getWebhooksVersion();
		const apiAlerts = await this.getApiAlertsVersion();
		const notifications = await this.getNotificationsVersion();
		const sse = await this.getSSEVersion();
		//
		return {
			webhooks,
			apiAlerts,
			notifications,
			sse,
		};
	}
}
