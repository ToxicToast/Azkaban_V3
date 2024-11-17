import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	CronjobTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class CronjobService {
	constructor(
		@Inject('CRONJOB_SERVICE')
		private readonly client: ClientProxy,
	) {}

	async warcraftCronjob(): Promise<void> {
		const payload = RmqRecordBuilderHelper({});
		await this.client.emit(CronjobTopics.WARCRAFT, payload).toPromise();
	}

	async viewerCronjob(): Promise<void> {
		const payload = RmqRecordBuilderHelper({});
		await this.client.emit(CronjobTopics.VIEWER, payload).toPromise();
	}
}
