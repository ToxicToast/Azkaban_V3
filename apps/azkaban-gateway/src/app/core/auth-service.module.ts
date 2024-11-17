import { Module } from '@nestjs/common';
import {
	azkaban_auth,
	azkaban_vhost,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from './broker-defaults';
import { RabbitmqModule } from '../../modules';

@Module({
	imports: [
		RabbitmqModule.forRoot({
			name: 'AUTH_SERVICE',
			queueName: azkaban_auth,
			brokerVHost: azkaban_vhost,
			...brokerDefaultSettings,
			global: true,
		}),
	],
	exports: [RabbitmqModule],
})
export class AuthServiceModule {}
