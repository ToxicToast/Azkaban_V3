import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
      defaultLabels: {
        app: 'azkaban-gateway',
      },
      path: '/metrics',
      controller: MetricsController,
    }),
  ],
})
export class MetricsModule {}
