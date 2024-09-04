import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
	azkaban_notify,
	azkaban_vhost,
	clientProvider,
	twitch_messages,
	twitch_vhost,
	twitch_viewers,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { BotService } from './bot.service';

const brokerDefaultSettings = {
	noAck: process.env.BROKER_ACK === 'yes' ? true : false,
	brokerUsername: process.env.BROKER_USERNAME,
	brokerPassword: process.env.BROKER_PASSWORD,
	brokerHost: process.env.BROKER_HOST,
	brokerPort: parseInt(process.env.BROKER_PORT),
};

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'NOTIFY_SERVICE',
				...clientProvider({
					queueName: azkaban_notify,
					brokerVHost: azkaban_vhost,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'MESSAGES_SERVICE',
				...clientProvider({
					queueName: twitch_messages,
					brokerVHost: twitch_vhost,
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	controllers: [],
	providers: [
		{
			provide: 'TWITCH_USER_ID',
			useFactory: (config: ConfigService) => {
				return config.get('TWITCH_USER_ID', '');
			},
			inject: [ConfigService],
		},
		{
			provide: 'TWITCH_CLIENT_ID',
			useFactory: (config: ConfigService) => {
				return config.get('TWITCH_CLIENT_ID', '');
			},
			inject: [ConfigService],
		},
		{
			provide: 'TWITCH_CLIENT_SECRET',
			useFactory: (config: ConfigService) => {
				return config.get('TWITCH_CLIENT_SECRET', '');
			},
			inject: [ConfigService],
		},
		{
			provide: 'TWITCH_ACCESS_TOKEN',
			useFactory: (config: ConfigService) => {
				return config.get('TWITCH_ACCESS_TOKEN', '');
			},
			inject: [ConfigService],
		},
		{
			provide: 'TWITCH_REFRESH_TOKEN',
			useFactory: (config: ConfigService) => {
				return config.get('TWITCH_REFRESH_TOKEN', '');
			},
			inject: [ConfigService],
		},
		{
			provide: 'TWITCH_CHANNELS',
			useFactory: (config: ConfigService) => {
				return config.get('TWITCH_CHANNELS', '');
			},
			inject: [ConfigService],
		},
		{
			provide: 'BOT_LOGGING',
			useFactory: (config: ConfigService) => {
				return config.get('NODE_ENV', 'development') === 'development';
			},
			inject: [ConfigService],
		},
		BotService,
	],
})
export class BotModule {}
