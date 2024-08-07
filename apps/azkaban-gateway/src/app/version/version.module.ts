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
    foodfolio_size,
    foodfolio_type,
    foodfolio_warehouse,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ClientsModule.register([
            // NOTIFY
            {
                name: 'WEBHOOKS_SERVICE',
                ...clientProvider({
                    queueName: azkaban_notify,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            {
                name: 'APIALERTS_SERVICE',
                ...clientProvider({
                    queueName: azkaban_notify_apialerts,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            {
                name: 'NOTIFICATIONS_SERVICE',
                ...clientProvider({
                    queueName: azkaban_notify_notification,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            {
                name: 'SSE_SERVICE',
                ...clientProvider({
                    queueName: azkaban_notify_sse,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            // USER
            {
                name: 'USERS_SERVICE',
                ...clientProvider({
                    queueName: azkaban_user,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            // Auth
            {
                name: 'AUTH_SERVICE',
                ...clientProvider({
                    queueName: azkaban_auth,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            // Group
            {
                name: 'GROUP_SERVICE',
                ...clientProvider({
                    queueName: azkaban_group,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            // Foodfolio
            {
                name: 'FOODFOLIO_CATEGORY_SERVICE',
                ...clientProvider({
                    queueName: foodfolio_category,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            {
                name: 'FOODFOLIO_COMPANY_SERVICE',
                ...clientProvider({
                    queueName: foodfolio_company,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            {
                name: 'FOODFOLIO_LOCATION_SERVICE',
                ...clientProvider({
                    queueName: foodfolio_location,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            {
                name: 'FOODFOLIO_SIZE_SERVICE',
                ...clientProvider({
                    queueName: foodfolio_size,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            {
                name: 'FOODFOLIO_TYPE_SERVICE',
                ...clientProvider({
                    queueName: foodfolio_type,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            {
                name: 'FOODFOLIO_ITEM_SERVICE',
                ...clientProvider({
                    queueName: foodfolio_product,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            {
                name: 'FOODFOLIO_ITEM_DETAIL_SERVICE',
                ...clientProvider({
                    queueName: foodfolio_product_detail,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                }),
            },
            {
                name: 'FOODFOLIO_WAREHOUSE_SERVICE',
                ...clientProvider({
                    queueName: foodfolio_warehouse,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
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
