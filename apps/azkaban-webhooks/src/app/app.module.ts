import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [HealthModule, MetricsModule, VersionModule, WebhooksModule],
})
export class AppModule {}
