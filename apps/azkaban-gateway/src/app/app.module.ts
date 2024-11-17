import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { VersionModule } from './version/version.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { JwtModule } from '@nestjs/jwt';
import { FoodfolioModule } from './foodfolio/foodfolio.module';
import { MobileModule } from './mobile/mobile.module';
import { CachingModule } from './core/caching.module';
import { TwitchModule } from './twitch/twitch.module';
import { WarcraftModule } from './warcraft/warcraft.module';
import { AuthServiceModule } from './core/auth-service.module';
import { ApiAlertsServiceModule } from './core/apialerts-service.module';
import { CronjobModule } from './cronjobs/cronjob.module';
import { CronjobServiceModule } from './core/cronjob-service.module';

@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: (config: ConfigService) => {
				return {
					global: true,
					secret: config.get('JWT_SECRET', 'secret'),
					signOptions: { expiresIn: '1h' },
				};
			},
			inject: [ConfigService],
		}),
		ConfigModule.forRoot({ isGlobal: true }),
		ThrottlerModule.forRoot([
			{
				name: 'azkaban',
				ttl: 60000,
				limit: 10,
			},
		]),
		// RabbitMQ Modules
		AuthServiceModule,
		ApiAlertsServiceModule,
		CronjobServiceModule,
		// Azkaban Services
		CachingModule,
		HealthModule,
		MetricsModule,
		VersionModule,
		UserModule,
		AuthModule,
		GroupsModule,
		FoodfolioModule,
		MobileModule,
		TwitchModule,
		WarcraftModule,
		CronjobModule,
	],
})
export class AppModule {}
