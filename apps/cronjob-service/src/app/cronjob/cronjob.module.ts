import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
	clientProvider,
	foodfolio_product,
	foodfolio_product_variant,
	foodfolio_shopping_list,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { ScheduleModule } from '@nestjs/schedule';
import { ShoppingListService } from './shoppinglist.service';

const brokerDefaultSettings = {
	noAck: process.env.BROKER_ACK === 'yes' ? true : false,
	brokerUsername: process.env.BROKER_USERNAME,
	brokerPassword: process.env.BROKER_PASSWORD,
	brokerHost: process.env.BROKER_HOST,
	brokerPort: parseInt(process.env.BROKER_PORT),
};

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ClientsModule.register([
			{
				name: 'ITEM_SERVICE',
				...clientProvider({
					queueName: foodfolio_product,
					consumerTag: 'cronjob-foodfolio-item-service',
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'ITEM_VARIANT_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_variant,
					consumerTag: 'cronjob-foodfolio-item-variant-service',
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'SHOPPINGLIST_SERVICE',
				...clientProvider({
					queueName: foodfolio_shopping_list,
					consumerTag: 'cronjob-foodfolio-shopping-list-service',
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	providers: [ShoppingListService],
})
export class CronjobModule {}
