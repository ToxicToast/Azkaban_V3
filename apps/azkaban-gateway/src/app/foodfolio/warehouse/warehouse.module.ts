import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import {
	azkaban_notify,
	clientProvider,
	foodfolio_warehouse,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { CachingModule } from '../../core/caching.module';

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
				name: 'WAREHOUSE_SERVICE',
				...clientProvider({
					queueName: foodfolio_warehouse,
					consumerTag: 'foodfolio-warehouse',
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'NOTIFY_SERVICE',
				...clientProvider({
					queueName: azkaban_notify,
					consumerTag: 'foodfolio-warehouse-notify',
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	controllers: [WarehouseController],
	providers: [AuthGuard, NotifyService, WarehouseService],
})
export class WarehouseModule {}
