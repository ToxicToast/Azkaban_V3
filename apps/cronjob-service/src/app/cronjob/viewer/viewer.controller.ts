import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CronjobTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { ViewerCron } from './viewer.cron';

@Controller('viewer')
export class ViewerController {
	constructor(private readonly cronjob: ViewerCron) {}

	@EventPattern(CronjobTopics.VIEWER)
	async handleViewerCronjob(): Promise<void> {
		Logger.log('Received Viewer Cronjob', 'ViewerController');
		await this.cronjob.runQueue();
	}
}
