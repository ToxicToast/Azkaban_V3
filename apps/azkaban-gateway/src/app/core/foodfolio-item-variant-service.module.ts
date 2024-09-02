import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
	clientProvider,
	foodfolio_product_variant,
	foodfolio_vhost,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from './broker-defaults';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'FOODFOLIO_ITEM_VARIANT_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_variant,
					brokerVHost: foodfolio_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	exports: [ClientsModule],
})
export class FoodfolioItemVariantServiceModule {}
