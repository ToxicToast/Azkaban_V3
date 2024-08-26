import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { VersionModule } from './version/version.module';
import { MetricsModule } from './metrics/metrics.module';
import { ShoppingListModule } from './shoppinglist/shoppinglist.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		HealthModule,
		MetricsModule,
		VersionModule,
		ShoppingListModule,
	],
})
export class AppModule {}
