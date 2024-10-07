import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
	clientProvider,
	warcraft_character,
	warcraft_vhost,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from './broker-defaults';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'WARCRAFT_CHARACTER_SERVICE',
				...clientProvider({
					queueName: warcraft_character,
					brokerVHost: warcraft_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	exports: [ClientsModule],
})
export class WarcraftCharacterServiceModule {}
