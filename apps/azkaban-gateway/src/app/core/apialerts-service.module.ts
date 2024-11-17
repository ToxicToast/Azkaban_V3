import { Module } from '@nestjs/common';
import {
	azkaban_notify_apialerts,
	azkaban_vhost,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from './broker-defaults';
import { RabbitmqModule } from '../../modules';

@Module({
	imports: [
		RabbitmqModule.forRoot({
			name: 'APIALERTS_SERVICE',
			queueName: azkaban_notify_apialerts,
			brokerVHost: azkaban_vhost,
			...brokerDefaultSettings,
			global: true,
		}),
	],
	exports: [RabbitmqModule],
})
export class ApiAlertsServiceModule {}
