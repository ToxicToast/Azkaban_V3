import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { VersionModule } from './version/version.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'azkaban',
        ttl: 60000,
        limit: 10,
      },
    ]),
    //
    HealthModule,
    MetricsModule,
    VersionModule,
  ],
})
export class AppModule {}
