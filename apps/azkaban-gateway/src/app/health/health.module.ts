import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ConfigService } from '@nestjs/config';
import { azkaban_vhost } from '@toxictoast/azkaban-broker-rabbitmq';

@Module({
	imports: [
		TerminusModule.forRoot({
			errorLogStyle: 'pretty',
		}),
	],
	controllers: [HealthController],
	providers: [
		{
			provide: 'MEMORY_HEAP_TRESHOLD',
			useFactory: (config: ConfigService) => {
				return config.get('MEMORY_HEAP_TRESHOLD', 0);
			},
			inject: [ConfigService],
		},
		{
			provide: 'MEMORY_RSS_TRESHOLD',
			useFactory: (config: ConfigService) => {
				return config.get('MEMORY_RSS_TRESHOLD', 0);
			},
			inject: [ConfigService],
		},
		{
			provide: 'BROKER_CONNECTION_STRING',
			useFactory: (config: ConfigService) => {
				const username = config.get('BROKER_USERNAME', 'guest');
				const password = config.get('BROKER_PASSWORD', 'guest');
				const hostname = config.get('BROKER_HOST', 'localhost');
				const port = config.get('BROKER_PORT', 5672);
				//
				return `amqp://${username}:${password}@${hostname}:${port}/${azkaban_vhost}`;
			},
			inject: [ConfigService],
		},
		{
			provide: 'REDIS_HOST_STRING',
			useFactory: (config: ConfigService) => {
				return config.get('REDIS_HOST', 'localhost');
			},
			inject: [ConfigService],
		},
		{
			provide: 'REDIS_PORT_NUMBER',
			useFactory: (config: ConfigService) => {
				return config.get('REDIS_PORT', 6379);
			},
			inject: [ConfigService],
		},
		{
			provide: 'REDIS_PASSWORD_STRING',
			useFactory: (config: ConfigService) => {
				return config.get('REDIS_PASSWORD', 'supersecret');
			},
			inject: [ConfigService],
		},
	],
})
export class HealthModule {}
