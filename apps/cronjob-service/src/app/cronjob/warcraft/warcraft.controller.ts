import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CronjobTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { WarcraftCron } from './warcraft.cron';

@Controller('warcraft')
export class WarcraftController {
	constructor(private readonly cronjob: WarcraftCron) {}

	@MessagePattern(CronjobTopics.WARCRAFT)
	async handleWarcraftCronjob(): Promise<void> {
		Logger.log('Received Warcraft Cronjob', 'WarcraftController');
		await this.cronjob.runQueue();
	}
}
