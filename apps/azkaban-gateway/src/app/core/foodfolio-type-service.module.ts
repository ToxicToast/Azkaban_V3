import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
	clientProvider,
	foodfolio_type,
	foodfolio_vhost,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from './broker-defaults';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'FOODFOLIO_TYPE_SERVICE',
				...clientProvider({
					queueName: foodfolio_type,
					brokerVHost: foodfolio_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	exports: [ClientsModule],
})
export class FoodfolioTypeServiceModule {}
