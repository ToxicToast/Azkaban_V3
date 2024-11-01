import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	NotifyTopics,
	RmqRecordBuilderHelper,
	WarcraftCharacterTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class NotifyService {
	constructor(
		@Inject('NOTIFY_SERVICE') private readonly client: ClientProxy,
	) {}

	async onCreateCharacter(
		id: string,
		region: string,
		realm: string,
		name: string,
	): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			service: 'warcraft-character-service',
			event: WarcraftCharacterTopics.CREATE,
			data: {
				id,
				region,
				realm,
				name,
			},
		});
		await this.client.emit(NotifyTopics.NOTIFY, payload).toPromise();
	}
}
