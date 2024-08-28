import { Module } from '@nestjs/common';
import { CachingModule } from '../core/caching.module';
import { MobileService } from './mobile.service';
import { MobileController } from './mobile.controller';
import { ClientsModule } from '@nestjs/microservices';
import {
	clientProvider,
	foodfolio_product,
	foodfolio_product_variant,
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
		CachingModule,
		ClientsModule.register([
			{
				name: 'ITEM_SERVICE',
				...clientProvider({
					queueName: foodfolio_product,
					consumerTag: 'mobile-foodfolio-item',
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'ITEM_VARIANT_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_variant,
					consumerTag: 'mobile-foodfolio-item-variant',
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	controllers: [MobileController],
	providers: [MobileService],
})
export class MobileModule {}
