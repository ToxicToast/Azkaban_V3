import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    HealthModule,
    MetricsModule,
    VersionModule,
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
        path: 'version',
        module: VersionModule,
      },
    ]),
  ],
})
export class AppModule {}
