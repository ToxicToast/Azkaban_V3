import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { ClientsModule } from '@nestjs/microservices';
import {
	azkaban_notify_apialerts,
	azkaban_notify_notification,
	azkaban_notify_sse,
	clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';

const brokerDefaultSettings = {
	noAck: process.env.BROKER_ACK === 'yes' ? true : false,
	brokerUsername: process.env.BROKER_USERNAME,
	brokerPassword: process.env.BROKER_PASSWORD,
	brokerHost: process.env.BROKER_HOST,
	brokerPort: parseInt(process.env.BROKER_PORT),
	brokerVHost: process.env.BROKER_VHOST,
};

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'APIALERTS_SERVICE',
				...clientProvider({
					queueName: azkaban_notify_apialerts,
					consumerTag: 'webhooks-apialerts',
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'SSE_SERVICE',
				...clientProvider({
					queueName: azkaban_notify_sse,
					consumerTag: 'webhooks-sse',
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'NOTIFICATION_SERVICE',
				...clientProvider({
					queueName: azkaban_notify_notification,
					consumerTag: 'webhooks-notifications',
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	controllers: [WebhooksController],
})
export class WebhooksModule {}
