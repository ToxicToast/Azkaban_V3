import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
	azkaban_group,
	azkaban_vhost,
	clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from './broker-defaults';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'GROUP_SERVICE',
				...clientProvider({
					queueName: azkaban_group,
					brokerVHost: azkaban_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	exports: [ClientsModule],
})
export class GroupsServiceModule {}
