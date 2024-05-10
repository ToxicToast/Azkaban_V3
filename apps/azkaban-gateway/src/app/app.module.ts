import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { GroupsModule } from './groups/groups.module';
import { VersionModule } from './version/version.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { azkaban, clientProvider } from '@toxictoast/azkaban-broker-rabbitmq';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'azkaban',
        ttl: 60000,
        limit: 10,
      },
    ]),
    ClientsModule.register({
      isGlobal: true,
      clients: [
        {
          name: 'AZKABAN_SERVICE',
          ...clientProvider({
            queueName: azkaban,
            noAck: process.env.BROKER_ACK === 'yes' ? true : false,
            brokerUsername: process.env.BROKER_USERNAME,
            brokerPassword: process.env.BROKER_PASSWORD,
            brokerHost: process.env.BROKER_HOST,
            brokerPort: parseInt(process.env.BROKER_PORT),
          }),
        },
      ],
    }),
    //
    HealthModule,
    MetricsModule,
    AuthModule,
    UsersModule,
    GroupsModule,
    VersionModule,
    NotifyModule,
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
      {
        path: 'notify',
        module: NotifyModule,
      },
    ]),
  ],
})
export class AppModule {}
