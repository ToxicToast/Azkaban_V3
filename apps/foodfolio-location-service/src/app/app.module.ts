import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MetricsModule } from './metrics/metrics.module';
import { HealthModule } from './health/health.module';
import { VersionModule } from './version/version.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        HealthModule,
        MetricsModule,
        VersionModule,
    ],
})
export class AppModule {}
