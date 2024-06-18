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
        //
        HealthModule,
        MetricsModule,
        VersionModule,
        UserModule,
        AuthModule,
        GroupsModule,
    ],
})
export class AppModule {}
