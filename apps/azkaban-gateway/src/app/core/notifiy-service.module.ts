import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
	azkaban_notify,
	azkaban_vhost,
	clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from './broker-defaults';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'NOTIFY_SERVICE',
				...clientProvider({
					queueName: azkaban_notify,
					brokerVHost: azkaban_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	exports: [ClientsModule],
})
export class NotifyServiceModule {}