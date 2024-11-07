import { Module } from '@nestjs/common';
import { QueueModule } from '../../queue/queue.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule } from '@nestjs/microservices';
import {
	clientProvider,
	twitch_vhost,
	twitch_viewers,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from '../../broker-defaults';
import { ViewerService } from './viewer.service';
import { ViewerProcessor } from './viewer.processor';
import { ViewerCron } from './viewer.cron';
import { ViewerQueueModule } from '../../queue/viewer-queue.module';

@Module({
	imports: [
		QueueModule,
		ScheduleModule.forRoot(),
		ClientsModule.register([
			{
				name: 'VIEWER_SERVICE',
				...clientProvider({
					queueName: twitch_viewers,
					brokerVHost: twitch_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
		ViewerQueueModule,
	],
	providers: [ViewerService, ViewerProcessor, ViewerCron],
})
export class ViewerModule {}
