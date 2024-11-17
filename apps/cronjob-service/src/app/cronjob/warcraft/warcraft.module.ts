import { Module } from '@nestjs/common';
import { QueueModule } from '../../queue/queue.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule } from '@nestjs/microservices';
import {
	clientProvider,
	warcraft_api,
	warcraft_character,
	warcraft_vhost,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from '../../broker-defaults';
import { WarcraftService } from './warcraft.service';
import { WarcraftProcessor } from './warcraft.processor';
import { WarcraftCron } from './warcraft.cron';
import { WarcraftApiQueueModule } from '../../queue/warcraftapi-queue.module';
import { WarcraftController } from './warcraft.controller';

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
				name: 'API_SERVICE',
				...clientProvider({
					queueName: warcraft_api,
					brokerVHost: warcraft_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
		WarcraftApiQueueModule,
	],
	providers: [WarcraftService, WarcraftProcessor, WarcraftCron],
	controllers: [WarcraftController],
})
export class WarcraftModule {}
