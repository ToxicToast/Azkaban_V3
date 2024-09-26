import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { AlertsModule } from './alerts.module';
import { VersionModule } from './version/version.module';
import { ConfigModule } from '@nestjs/config';
import { AuthAlertsModule } from './auth-alerts/auth-alerts.module';
import { TwitchAlertsModule } from './twitch-alerts/twitch-alerts.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		HealthModule,
		MetricsModule,
		VersionModule,
		AlertsModule,
		AuthAlertsModule,
		TwitchAlertsModule,
	],
})
export class AppModule {}
