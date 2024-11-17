import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { WarcraftService } from './warcraft.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WarcraftCron {
	constructor(
		private readonly service: WarcraftService,
		@InjectQueue('warcraft-api') private readonly queue: Queue,
	) {}

	async runQueue(): Promise<void> {
		const characters = await this.service.getAllCharacters();
		for (const character of characters) {
			if (!character.isDeleted) {
				await this.queue.add('warcraft-api', {
					id: character.id,
					region: character.region,
					realm: character.realm,
					name: character.name,
				});
			}
		}
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
		name: 'Update All Warcraft Characters',
	})
	async charactersCronjob(): Promise<void> {
		await this.runQueue();
	}
}
