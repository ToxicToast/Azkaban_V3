import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { RouterModule } from '@nestjs/core';
import { ClientsModule } from '@nestjs/microservices';
import { azkaban, clientProvider } from '@toxictoast/azkaban-broker-rabbitmq';

@Module({
  imports: [
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
    VersionModule,
    WebhooksModule,
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
        path: 'version',
        module: VersionModule,
      },
      {
        path: 'hooks',
        module: WebhooksModule,
      },
    ]),
  ],
})
export class AppModule {}
