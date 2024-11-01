import { Module } from '@nestjs/common';
import { QueueModule } from '../queue/queue.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule } from '@nestjs/microservices';
import {
	azkaban_user,
	azkaban_vhost,
	clientProvider,
	foodfolio_product,
	foodfolio_product_variant,
	foodfolio_shopping_list,
	foodfolio_vhost,
	twitch_vhost,
	twitch_viewers,
	warcraft_api,
	warcraft_character,
	warcraft_vhost,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { ShoppinglistQueueModule } from '../queue/shoppinglist-queue.module';
import { UserQueueModule } from '../queue/user-queue.module';
import { ViewerQueueModule } from '../queue/viewer-queue.module';
import { WarcraftApiQueueModule } from '../queue/warcraftapi-queue.module';
import { WarcraftService } from './warcraft/warcraft.service';
import { WarcraftProcessor } from './warcraft/warcraft.processor';
import { WarcraftCron } from './warcraft/warcraft.cron';
import { WarcraftController } from './warcraft/warcraft.controller';

const brokerDefaultSettings = {
	noAck: process.env.BROKER_ACK === 'yes' ? true : false,
	brokerUsername: process.env.BROKER_USERNAME,
	brokerPassword: process.env.BROKER_PASSWORD,
	brokerHost: process.env.BROKER_HOST,
	brokerPort: parseInt(process.env.BROKER_PORT),
};

@Module({
	imports: [
		QueueModule,
		ScheduleModule.forRoot(),
		ClientsModule.register([
			{
				name: 'CHARACTER_SERVICE',
				...clientProvider({
					queueName: warcraft_character,
					brokerVHost: warcraft_vhost,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'WARCRAFT_API_SERVICE',
				...clientProvider({
					queueName: warcraft_api,
					brokerVHost: warcraft_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
		ShoppinglistQueueModule,
		UserQueueModule,
		ViewerQueueModule,
		WarcraftApiQueueModule,
	],
	controllers: [WarcraftController],
	providers: [WarcraftService, WarcraftProcessor, WarcraftCron],
})
export class CronjobModule {}
