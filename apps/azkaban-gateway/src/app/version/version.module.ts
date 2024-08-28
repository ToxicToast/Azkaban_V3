import { Module } from '@nestjs/common';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';
import { ClientsModule } from '@nestjs/microservices';
import {
	azkaban_auth,
	azkaban_group,
	azkaban_notify,
	azkaban_notify_apialerts,
	azkaban_notify_notification,
	azkaban_notify_sse,
	azkaban_user,
	clientProvider,
	foodfolio_category,
	foodfolio_company,
	foodfolio_location,
	foodfolio_product,
	foodfolio_product_detail,
	foodfolio_product_variant,
	foodfolio_shopping_list,
	foodfolio_size,
	foodfolio_type,
	foodfolio_warehouse,
	azkaban_cronjob,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { ConfigService } from '@nestjs/config';

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
			// NOTIFY
			{
				name: 'WEBHOOKS_SERVICE',
				...clientProvider({
					queueName: azkaban_notify,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'APIALERTS_SERVICE',
				...clientProvider({
					queueName: azkaban_notify_apialerts,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'NOTIFICATIONS_SERVICE',
				...clientProvider({
					queueName: azkaban_notify_notification,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'SSE_SERVICE',
				...clientProvider({
					queueName: azkaban_notify_sse,
					...brokerDefaultSettings,
				}),
			},
			// USER
			{
				name: 'USERS_SERVICE',
				...clientProvider({
					queueName: azkaban_user,
					...brokerDefaultSettings,
				}),
			},
			// Auth
			{
				name: 'AUTH_SERVICE',
				...clientProvider({
					queueName: azkaban_auth,
					...brokerDefaultSettings,
				}),
			},
			// Group
			{
				name: 'GROUP_SERVICE',
				...clientProvider({
					queueName: azkaban_group,
					...brokerDefaultSettings,
				}),
			},
			// Foodfolio
			{
				name: 'FOODFOLIO_CATEGORY_SERVICE',
				...clientProvider({
					queueName: foodfolio_category,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'FOODFOLIO_COMPANY_SERVICE',
				...clientProvider({
					queueName: foodfolio_company,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'FOODFOLIO_LOCATION_SERVICE',
				...clientProvider({
					queueName: foodfolio_location,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'FOODFOLIO_SIZE_SERVICE',
				...clientProvider({
					queueName: foodfolio_size,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'FOODFOLIO_TYPE_SERVICE',
				...clientProvider({
					queueName: foodfolio_type,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'FOODFOLIO_ITEM_SERVICE',
				...clientProvider({
					queueName: foodfolio_product,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'FOODFOLIO_ITEM_DETAIL_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_detail,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'FOODFOLIO_ITEM_VARIANT_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_variant,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'FOODFOLIO_WAREHOUSE_SERVICE',
				...clientProvider({
					queueName: foodfolio_warehouse,
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'FOODFOLIO_SHOPPINGLIST_SERVICE',
				...clientProvider({
					queueName: foodfolio_shopping_list,
					...brokerDefaultSettings,
				}),
			},
			// Cronjob
			{
				name: 'CRONJOB_SERVICE',
				...clientProvider({
					queueName: azkaban_cronjob,
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	controllers: [VersionController],
	providers: [
		VersionService,
		{
			provide: 'APP_VERSION',
			useFactory: (config: ConfigService) => {
				return config.get('APP_VERSION', 'local');
			},
			inject: [ConfigService],
		},
	],
})
export class VersionModule {}
