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
		JwtModule,
		ClientsModule.register([
			{
				name: 'ITEM_VARIANT_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_variant,
					consumerTag: 'foodfolio-item-variant',
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'ITEM_DETAIL_SERVICE',
				...clientProvider({
					queueName: foodfolio_product_detail,
					consumerTag: 'foodfolio-itemdetail',
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'NOTIFY_SERVICE',
				...clientProvider({
					queueName: azkaban_notify,
					consumerTag: 'foodfolio-item-variant-notify',
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	controllers: [ItemVariantController],
	providers: [AuthGuard, NotifyService, ItemVariantService],
})
export class ItemVariantModule {}
