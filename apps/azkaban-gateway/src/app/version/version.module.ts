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

const brokerDefaultOptions = {
	noAck: process.env.BROKER_ACK === 'yes' ? true : false,
	brokerUsername: process.env.BROKER_USERNAME,
	brokerPassword: process.env.BROKER_PASSWORD,
	brokerHost: process.env.BROKER_HOST,
	brokerPort: parseInt(process.env.BROKER_PORT),
};

@Module({
	imports: [
		ClientsModule.register([
			// NOTIFY
			{
				name: 'WEBHOOKS_SERVICE',
				...clientProvider({
					queueName: azkaban_notify,
					...brokerDefaultOptions,
				}),
			},
			{
				name: 'APIALERTS_SERVICE',
				...clientProvider({
					queueName: azkaban_notify_apialerts,
					...brokerDefaultOptions,
				}),
			},
			{
				name: 'NOTIFICATIONS_SERVICE',
				...clientProvider({
					queueName: azkaban_notify_notification,
					...brokerDefaultOptions,
				}),
			},
			{
				name: 'SSE_SERVICE',
				...clientProvider({
					queueName: azkaban_notify_sse,
					...brokerDefaultOptions,
				}),
			},
			// USER
			{
				name: 'USERS_SERVICE',
				...clientProvider({
					queueName: azkaban_user,
					...brokerDefaultOptions,
				}),
			},
			// Auth
			{
				name: 'AUTH_SERVICE',
				...clientProvider({
					queueName: azkaban_auth,
					...brokerDefaultOptions,
				}),
			},
			// Group
			{
				name: 'GROUP_SERVICE',
				...clientProvider({
					queueName: azkaban_group,
					...brokerDefaultOptions,
				}),
			},
			// Foodfolio
			{
				name: 'FOODFOLIO_CATEGORY_SERVICE',
				...clientProvider({
					queueName: foodfolio_category,
					...brokerDefaultOptions,
				}),
			},
			{
				name: 'FOODFOLIO_COMPANY_SERVICE',
				...clientProvider({
					queueName: foodfolio_company,
					...brokerDefaultOptions,
				}),
			},
			{
				name: 'FOODFOLIO_LOCATION_SERVICE',
				...clientProvider({
					queueName: foodfolio_location,
					...brokerDefaultOptions,
				}),
			},
			{
				name: 'FOODFOLIO_SIZE_SERVICE',
				...clientProvider({
					queueName: foodfolio_size,
					...brokerDefaultOptions,
				}),
			},
			{
				name: 'FOODFOLIO_TYPE_SERVICE',
				...clientProvider({
					queueName: foodfolio_type,
					...brokerDefaultOptions,
				}),
			},
			{
				name: 'FOODFOLIO_ITEM_SERVICE',
				...clientProvider({
					queueName: foodfolio_product,
					...brokerDefaultOptions,
				}),
			},
			{
				name: 'FOODFOLIO_ITEM_DETAIL_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_detail,
					...brokerDefaultOptions,
				}),
			},
			{
				name: 'FOODFOLIO_ITEM_VARIANT_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_variant,
					...brokerDefaultOptions,
				}),
			},
			{
				name: 'FOODFOLIO_WAREHOUSE_SERVICE',
				...clientProvider({
					queueName: foodfolio_warehouse,
					...brokerDefaultOptions,
				}),
			},
			{
				name: 'FOODFOLIO_SHOPPINGLIST_SERVICE',
				...clientProvider({
					queueName: foodfolio_shopping_list,
					...brokerDefaultOptions,
				}),
			},
			// Cronjob
			{
				name: 'CRONJOB_SERVICE',
				...clientProvider({
					queueName: azkaban_cronjob,
					...brokerDefaultOptions,
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
