import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { ItemVariantModule } from './item-variant/item-variant.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		HealthModule,
		MetricsModule,
		VersionModule,
		ItemVariantModule,
	],
})
export class AppModule {}
