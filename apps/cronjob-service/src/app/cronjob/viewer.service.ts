import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	TwitchViewerTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ViewerDAO } from '@azkaban/twitch-infrastructure';

@Injectable()
export class ViewersService {
	constructor(
		@Inject('VIEWER_SERVICE') private readonly viewerClient: ClientProxy,
	) {}

	private async getAllViewers(): Promise<Array<ViewerDAO>> {
		const payload = RmqRecordBuilderHelper({});
		return await this.viewerClient
			.send(TwitchViewerTopics.LIST, payload)
			.toPromise();
	}

	private async getViewerWithLastSeenLonger2Weeks(): Promise<
		Array<ViewerDAO>
	> {
		const viewers = await this.getAllViewers();
		return viewers.filter(
			(viewer: ViewerDAO) =>
				!viewer.isDeleted &&
				viewer.lastseen_at < new Date(Date.now() - 12096e5),
		);
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
		name: 'Inactive Twitch Viewers',
	})
	async checkForInactiveViewers(): Promise<void> {
		const viewers = await this.getViewerWithLastSeenLonger2Weeks();
		for (const viewer of viewers) {
			const payload = RmqRecordBuilderHelper({ id: viewer.id });
			await this.viewerClient
				.send(TwitchViewerTopics.DELETE, payload)
				.toPromise();
		}
	}
}
