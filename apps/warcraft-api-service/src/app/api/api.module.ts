import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
@Module({
	controllers: [ApiController],
	providers: [
		{
			provide: 'BLIZZARD_CLIENT_ID',
			useFactory: (config: ConfigService) => {
				return config.get('BLIZZARD_CLIENT_ID', '');
			},
			inject: [ConfigService],
		},
		{
			provide: 'BLIZZARD_CLIENT_SECRET',
			useFactory: (config: ConfigService) => {
				return config.get('BLIZZARD_CLIENT_SECRET', '');
			},
			inject: [ConfigService],
		},
		ApiService,
	],
})
export class ApiModule {}
