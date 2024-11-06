import { Injectable } from '@nestjs/common';
import { ViewerService } from './viewer.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ViewerCron {
	constructor(
		private readonly service: ViewerService,
		@InjectQueue('twitch-viewer') private readonly queue: Queue,
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
		name: 'Delete Inactive Twitch Viewers',
	})
	async checkForInactiveViewers(): Promise<void> {
		const viewers = await this.service.getAllViewers();
		for (const viewer of viewers) {
			await this.queue.add('twitch-viewer', viewer);
		}
	}
}
