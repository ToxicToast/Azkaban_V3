import { Module } from '@nestjs/common';
import { BullModule as BaseModule } from '@nestjs/bullmq';

const redisDefaultSettings = {
	host: process.env.REDIS_HOST,
	port: parseInt(process.env.REDIS_PORT),
	password: process.env.REDIS_PASSWORD,
};

@Module({
	imports: [
		BaseModule.forRoot({
			connection: {
				...redisDefaultSettings,
			},
		}),
		// Register Shoppinglist Queue,
		BaseModule.registerQueue({
			name: 'shoppinglist',
		}),
	],
	exports: [BaseModule],
})
export class BullModule {}
