import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VersionModule } from './version/version.module';
import { MetricsModule } from './metrics/metrics.module';
import { HealthModule } from './health/health.module';
import { TypeModule } from './type/type.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        HealthModule,
        MetricsModule,
        VersionModule,
        TypeModule,
    ],
})
export class AppModule {}
