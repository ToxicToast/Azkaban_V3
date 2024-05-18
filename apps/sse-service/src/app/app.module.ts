import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { SseModule } from './sse/sse.module';
import { VersionModule } from './version/version.module';

@Module({
  imports: [HealthModule, MetricsModule, SseModule, VersionModule],
})
export class AppModule {}
