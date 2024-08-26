import { Module } from '@nestjs/common';
import { CachingModule } from '../../core/caching.module';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import {
	azkaban_notify,
	clientProvider,
	foodfolio_shopping_list,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		ClientsModule.register([
			{
				name: 'SHOPPINGLIST_SERVICE',
				...clientProvider({
					queueName: foodfolio_shopping_list,
					noAck: process.env.BROKER_ACK === 'yes' ? true : false,
					brokerUsername: process.env.BROKER_USERNAME,
					brokerPassword: process.env.BROKER_PASSWORD,
					brokerHost: process.env.BROKER_HOST,
					brokerPort: parseInt(process.env.BROKER_PORT),
					consumerTag: 'foodfolio-shoppinglist',
				}),
			},
			{
				name: 'NOTIFY_SERVICE',
				...clientProvider({
					queueName: azkaban_notify,
					noAck: process.env.BROKER_ACK === 'yes' ? true : false,
					brokerUsername: process.env.BROKER_USERNAME,
					brokerPassword: process.env.BROKER_PASSWORD,
					brokerHost: process.env.BROKER_HOST,
					brokerPort: parseInt(process.env.BROKER_PORT),
					consumerTag: 'foodfolio-shoppinglist-notify',
				}),
			},
		]),
	],
	controllers: [ShoppingListController],
	providers: [AuthGuard, NotifyService, ShoppingListService],
})
export class ShoppingListModule {}
