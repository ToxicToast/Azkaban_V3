import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { RouterModule } from '@nestjs/core';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [
    HealthModule,
    MetricsModule,
    AlertsModule,
    RouterModule.register([
      {
        path: 'health',
        module: HealthModule,
      },
      {
        path: 'metrics',
        module: MetricsModule,
      },
      {
        path: 'alerts',
        module: AlertsModule,
      },
    ]),
  ],
})
export class AppModule {}
