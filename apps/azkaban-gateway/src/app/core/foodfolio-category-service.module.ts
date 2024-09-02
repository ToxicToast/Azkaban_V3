import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
	clientProvider,
	foodfolio_category,
	foodfolio_vhost,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from './broker-defaults';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'FOODFOLIO_CATEGORY_SERVICE',
				...clientProvider({
					queueName: foodfolio_category,
					brokerVHost: foodfolio_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	exports: [ClientsModule],
})
export class FoodfolioCategoryServiceModule {}
