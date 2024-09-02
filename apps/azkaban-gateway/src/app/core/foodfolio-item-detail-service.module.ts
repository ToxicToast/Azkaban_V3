import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
	clientProvider,
	foodfolio_product_detail,
	foodfolio_vhost,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from './broker-defaults';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'FOODFOLIO_ITEM_DETAIL_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_detail,
					brokerVHost: foodfolio_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	exports: [ClientsModule],
})
export class FoodfolioItemDetailServiceModule {}
