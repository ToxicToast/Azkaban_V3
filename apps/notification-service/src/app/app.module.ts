import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { RouterModule } from '@nestjs/core';
import { NotificationModule } from './notification/notification.module';

@Module({
    imports: [
        HealthModule,
        MetricsModule,
        NotificationModule,
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
                path: 'notifications',
                module: NotificationModule,
            },
        ]),
    ],
})
export class AppModule {}
