import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
    imports: [
        PrometheusModule.register({
            defaultMetrics: {
                enabled: true,
            },
            defaultLabels: {
                app: 'foodfolio-item-service',
            },
            path: '/metrics',
        }),
    ],
})
export class MetricsModule {}
