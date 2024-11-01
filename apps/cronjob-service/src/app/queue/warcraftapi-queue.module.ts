import { Module } from '@nestjs/common';
import { QueueModule } from './queue.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
	imports: [
		QueueModule,
		BullModule.registerQueue({
			name: 'warcraft-api',
		}),
	],
	exports: [BullModule],
})
export class WarcraftApiQueueModule {}
