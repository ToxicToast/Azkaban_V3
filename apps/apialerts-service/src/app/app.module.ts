import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { AlertsModule } from './alerts/alerts.module';
import { VersionModule } from './version/version.module';

@Module({
  imports: [HealthModule, MetricsModule, AlertsModule, VersionModule],
})
export class AppModule {}
