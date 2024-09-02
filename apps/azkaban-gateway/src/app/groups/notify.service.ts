import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	GroupsTopics,
	NotifyTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class NotifyService {
	constructor(
		@Inject('NOTIFY_SERVICE') private readonly client: ClientProxy,
	) {}

	async onCreate(id: string, title: string): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			service: 'group-service',
			event: GroupsTopics.CREATE,
			data: {
				id,
				title,
			},
		});
		await this.client.emit(NotifyTopics.NOTIFY, payload).toPromise();
	}
}
