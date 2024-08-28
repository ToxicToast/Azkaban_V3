import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import {
	azkaban_notify,
	clientProvider,
	foodfolio_location,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
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
				name: 'LOCATION_SERVICE',
				...clientProvider({
					queueName: foodfolio_location,
					consumerTag: 'foodfolio-location',
					...brokerDefaultSettings,
				}),
			},
			{
				name: 'NOTIFY_SERVICE',
				...clientProvider({
					queueName: azkaban_notify,
					consumerTag: 'foodfolio-location-notify',
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	controllers: [LocationController],
	providers: [AuthGuard, NotifyService, LocationService],
})
export class LocationModule {}
