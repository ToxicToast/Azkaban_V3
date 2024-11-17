import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

const redisDefaultSettings = {
	host: process.env.REDIS_HOST,
	port: parseInt(process.env.REDIS_PORT),
	password: process.env.REDIS_PASSWORD,
};

@Module({
	imports: [
		BullModule.forRoot({
			connection: {
				...redisDefaultSettings,
			},
			defaultJobOptions: {
				delay: 5,
			},
		}),
	],
	exports: [BullModule],
})
export class QueueModule {}
