import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { ConfigService } from '@nestjs/config';

@Module({
	providers: [
		{
			provide: 'MAGPIE_KEY',
			useFactory: (config: ConfigService) => {
				return config.get('MAGPIE_KEY', '-');
			},
			inject: [ConfigService],
		},
		AlertsService,
	],
	exports: [AlertsService],
})
export class AlertsModule {}
