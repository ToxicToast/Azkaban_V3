import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { RouterModule } from '@nestjs/core';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //
    HealthModule,
    MetricsModule,
    NotificationModule,
    //
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
