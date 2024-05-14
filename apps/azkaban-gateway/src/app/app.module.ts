import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { GroupsModule } from './groups/groups.module';
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
    AuthModule,
    UsersModule,
    GroupsModule,
    VersionModule,
    //
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
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'users',
        module: UsersModule,
      },
      {
        path: 'groups',
        module: GroupsModule,
      },
      {
        path: 'version',
        module: VersionModule,
      },
    ]),
  ],
})
export class AppModule {}
