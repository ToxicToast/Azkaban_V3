import { Module } from '@nestjs/common';
import { QueueModule } from './queue.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
	imports: [
		QueueModule,
		BullModule.registerQueue({
			name: 'twitch-viewer',
		}),
	],
})
export class ViewerQueueModule {}
