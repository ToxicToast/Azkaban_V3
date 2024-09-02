import { Module } from '@nestjs/common';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';
import { ConfigService } from '@nestjs/config';

@Module({
	controllers: [VersionController],
	providers: [
		VersionService,
		{
			provide: 'APP_VERSION',
			useFactory: (config: ConfigService) => {
				return config.get('APP_VERSION', 'local');
			},
			inject: [ConfigService],
		},
	],
})
export class VersionModule {}
