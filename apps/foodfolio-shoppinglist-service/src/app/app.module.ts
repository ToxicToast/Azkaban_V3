import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { VersionModule } from './version/version.module';
import { MetricsModule } from './metrics/metrics.module';
import { CronjobModule } from './cronjob/cronjob.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		HealthModule,
		MetricsModule,
		VersionModule,
		CronjobModule,
	],
})
export class AppModule {}
