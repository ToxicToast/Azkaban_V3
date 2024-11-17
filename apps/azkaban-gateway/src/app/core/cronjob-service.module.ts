import { Module } from '@nestjs/common';
import {
	azkaban_cronjob,
	azkaban_vhost,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { brokerDefaultSettings } from './broker-defaults';
import { RabbitmqModule } from '../../modules';

@Module({
	imports: [
		RabbitmqModule.forRoot({
			name: 'CRONJOB_SERVICE',
			queueName: azkaban_cronjob,
			brokerVHost: azkaban_vhost,
			...brokerDefaultSettings,
			global: true,
		}),
	],
	exports: [RabbitmqModule],
})
export class CronjobServiceModule {}
