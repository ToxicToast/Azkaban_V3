import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { ConfigModule } from '@nestjs/config';
import { ItemDetailModule } from './item-detail/item-detail.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        HealthModule,
        MetricsModule,
        VersionModule,
        ItemDetailModule,
    ],
})
export class AppModule {}
