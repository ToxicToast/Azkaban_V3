import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
	clientProvider,
	foodfolio_vhost,
	foodfolio_warehouse,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from './broker-defaults';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'FOODFOLIO_WAREHOUSE_SERVICE',
				...clientProvider({
					queueName: foodfolio_warehouse,
					brokerVHost: foodfolio_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	exports: [ClientsModule],
})
export class FoodfolioWarehouseServiceModule {}
