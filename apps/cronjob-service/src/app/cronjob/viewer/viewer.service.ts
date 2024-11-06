import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ViewerDAO } from '@azkaban/twitch-infrastructure';
import {
	RmqRecordBuilderHelper,
	TwitchViewerTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class ViewerService {
	constructor(
		@Inject('VIEWER_SERVICE') private readonly viewerClient: ClientProxy,
	) {}

	async getAllViewers(): Promise<Array<ViewerDAO>> {
		try {
			const payload = RmqRecordBuilderHelper({});
			return await this.viewerClient
				.send(TwitchViewerTopics.LIST, payload)
				.toPromise();
		} catch (error) {
			Logger.error(error);
			return [];
		}
	}

	async isViewerLastSeen2Weeks(viewer: ViewerDAO): Promise<boolean> {
		const twoWeeks = 12096e5;
		try {
			const lastSeen = new Date(viewer.lastseen_at);
			return lastSeen < new Date(Date.now() - twoWeeks);
		} catch (error) {
			return true;
		}
	}

	async deleteViewer(id: string): Promise<ViewerDAO> {
		const payload = RmqRecordBuilderHelper({ id });
		return await this.viewerClient
			.send(TwitchViewerTopics.DELETE, payload)
			.toPromise();
	}
}
