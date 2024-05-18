import { Module } from '@nestjs/common';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';
import { CircuitBreakerModule } from '../circuitbreaker/circuitbreaker.module';
import { ClientsModule } from '@nestjs/microservices';
import {
  azkaban_notify,
  azkaban_notify_apialerts,
  azkaban_notify_notification,
  azkaban_notify_sse,
  clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Module({
  imports: [
    CircuitBreakerModule,
    ClientsModule.register([
      {
        name: 'WEBHOOKS_SERVICE',
        ...clientProvider({
          queueName: azkaban_notify,
          noAck: process.env.BROKER_ACK === 'yes' ? true : false,
          brokerUsername: process.env.BROKER_USERNAME,
          brokerPassword: process.env.BROKER_PASSWORD,
          brokerHost: process.env.BROKER_HOST,
          brokerPort: parseInt(process.env.BROKER_PORT),
        }),
      },
      {
        name: 'APIALERTS_SERVICE',
        ...clientProvider({
          queueName: azkaban_notify_apialerts,
          noAck: process.env.BROKER_ACK === 'yes' ? true : false,
          brokerUsername: process.env.BROKER_USERNAME,
          brokerPassword: process.env.BROKER_PASSWORD,
          brokerHost: process.env.BROKER_HOST,
          brokerPort: parseInt(process.env.BROKER_PORT),
        }),
      },
      {
        name: 'NOTIFICATIONS_SERVICE',
        ...clientProvider({
          queueName: azkaban_notify_notification,
          noAck: process.env.BROKER_ACK === 'yes' ? true : false,
          brokerUsername: process.env.BROKER_USERNAME,
          brokerPassword: process.env.BROKER_PASSWORD,
          brokerHost: process.env.BROKER_HOST,
          brokerPort: parseInt(process.env.BROKER_PORT),
        }),
      },
      {
        name: 'SSE_SERVICE',
        ...clientProvider({
          queueName: azkaban_notify_sse,
          noAck: process.env.BROKER_ACK === 'yes' ? true : false,
          brokerUsername: process.env.BROKER_USERNAME,
          brokerPassword: process.env.BROKER_PASSWORD,
          brokerHost: process.env.BROKER_HOST,
          brokerPort: parseInt(process.env.BROKER_PORT),
        }),
      },
    ]),
  ],
  controllers: [VersionController],
  providers: [
    VersionService,
    {
      provide: 'APP_VERSION',
      useValue: process.env.APP_VERSION,
    },
  ],
})
export class VersionModule {}
