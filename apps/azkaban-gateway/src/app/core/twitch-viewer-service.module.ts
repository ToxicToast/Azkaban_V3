import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
	clientProvider,
	twitch_vhost,
	twitch_viewers,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from './broker-defaults';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'TWITCH_VIEWER_SERVICE',
				...clientProvider({
					queueName: twitch_viewers,
					brokerVHost: twitch_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	exports: [ClientsModule],
})
export class TwitchViewerServiceModule {}
