import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronjobService {
	private readonly logger = new Logger(CronjobService.name);

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
		name: 'Empty Products',
		timeZone: 'Europe/Berlin',
	})
	checkForEmptyProducts() {
		this.logger.debug('Checking for empty products');
	}
}
