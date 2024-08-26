import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { CategoryModule } from './category/category.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		HealthModule,
		MetricsModule,
		VersionModule,
		CategoryModule,
	],
})
export class AppModule {}
