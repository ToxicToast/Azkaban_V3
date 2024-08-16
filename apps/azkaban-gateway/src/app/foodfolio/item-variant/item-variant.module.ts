import { Module } from '@nestjs/common';
import { CachingModule } from '../../core/caching.module';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import {
	azkaban_notify,
	clientProvider,
	foodfolio_product_detail,
	foodfolio_product_variant,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { ItemVariantController } from './item-variant.controller';
import { ItemVariantService } from './item-variant.service';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		ClientsModule.register([
			{
				name: 'ITEM_VARIANT_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_variant,
					noAck: process.env.BROKER_ACK === 'yes' ? true : false,
					brokerUsername: process.env.BROKER_USERNAME,
					brokerPassword: process.env.BROKER_PASSWORD,
					brokerHost: process.env.BROKER_HOST,
					brokerPort: parseInt(process.env.BROKER_PORT),
					consumerTag: 'foodfolio-item-variant',
				}),
			},
			{
				name: 'ITEM_DETAIL_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_detail,
					noAck: process.env.BROKER_ACK === 'yes' ? true : false,
					brokerUsername: process.env.BROKER_USERNAME,
					brokerPassword: process.env.BROKER_PASSWORD,
					brokerHost: process.env.BROKER_HOST,
					brokerPort: parseInt(process.env.BROKER_PORT),
					consumerTag: 'foodfolio-itemdetail',
				}),
			},
			{
				name: 'NOTIFY_SERVICE',
				...clientProvider({
					queueName: azkaban_notify,
					noAck: process.env.BROKER_ACK === 'yes' ? true : false,
					brokerUsername: process.env.BROKER_USERNAME,
					brokerPassword: process.env.BROKER_PASSWORD,
					brokerHost: process.env.BROKER_HOST,
					brokerPort: parseInt(process.env.BROKER_PORT),
					consumerTag: 'foodfolio-item-variant-notify',
				}),
			},
		]),
	],
	controllers: [ItemVariantController],
	providers: [AuthGuard, NotifyService, ItemVariantService],
})
export class ItemVariantModule {}
