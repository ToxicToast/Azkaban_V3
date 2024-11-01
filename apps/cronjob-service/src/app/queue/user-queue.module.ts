import { Module } from '@nestjs/common';
import { QueueModule } from './queue.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
	imports: [
		QueueModule,
		BullModule.registerQueue({
			name: 'azkaban-user',
		}),
	],
})
export class UserQueueModule {}
