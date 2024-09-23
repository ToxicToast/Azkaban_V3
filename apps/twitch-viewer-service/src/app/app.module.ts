import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VersionModule } from './version/version.module';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { ViewerModule } from './viewer/viewer.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		HealthModule,
		MetricsModule,
		VersionModule,
		ViewerModule,
	],
})
export class AppModule {}
