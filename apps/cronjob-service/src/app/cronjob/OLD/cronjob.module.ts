import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
	azkaban_user,
	azkaban_vhost,
	clientProvider,
	foodfolio_product,
	foodfolio_product_variant,
	foodfolio_shopping_list,
	foodfolio_vhost,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { ScheduleModule } from '@nestjs/schedule';
import { ShoppingListService } from './shoppinglist.service';
import { UsersService } from './user.service';
import { BullModule } from './bull.module';

const brokerDefaultSettings = {
	noAck: process.env.BROKER_ACK === 'yes' ? true : false,
	brokerUsername: process.env.BROKER_USERNAME,
	brokerPassword: process.env.BROKER_PASSWORD,
	brokerHost: process.env.BROKER_HOST,
	brokerPort: parseInt(process.env.BROKER_PORT),
};

@Module({
	imports: [
		BullModule,
		ScheduleModule.forRoot(),
		ClientsModule.register([
			{
				name: 'ITEM_SERVICE',
				...clientProvider({
					queueName: foodfolio_product,
					brokerVHost: foodfolio_vhost,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'ITEM_VARIANT_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_variant,
					brokerVHost: foodfolio_vhost,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'SHOPPINGLIST_SERVICE',
				...clientProvider({
					queueName: foodfolio_shopping_list,
					brokerVHost: foodfolio_vhost,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'USER_SERVICE',
				...clientProvider({
					queueName: azkaban_user,
					brokerVHost: azkaban_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	providers: [ShoppingListService, UsersService],
})
export class CronjobModule {}
