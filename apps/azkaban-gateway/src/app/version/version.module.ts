import { Module } from '@nestjs/common';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';
import { CircuitBreakerModule } from '../circuitbreaker/circuitbreaker.module';
import { ClientsModule } from '@nestjs/microservices';
import {
  azkaban_auth,
  azkaban_group,
  azkaban_notify,
  azkaban_user,
  clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Module({
  imports: [
    CircuitBreakerModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        ...clientProvider({
          queueName: azkaban_auth,
          noAck: process.env.BROKER_ACK === 'yes' ? true : false,
          brokerUsername: process.env.BROKER_USERNAME,
          brokerPassword: process.env.BROKER_PASSWORD,
          brokerHost: process.env.BROKER_HOST,
          brokerPort: parseInt(process.env.BROKER_PORT),
        }),
      },
      {
        name: 'GROUP_SERVICE',
        ...clientProvider({
          queueName: azkaban_group,
          noAck: process.env.BROKER_ACK === 'yes' ? true : false,
          brokerUsername: process.env.BROKER_USERNAME,
          brokerPassword: process.env.BROKER_PASSWORD,
          brokerHost: process.env.BROKER_HOST,
          brokerPort: parseInt(process.env.BROKER_PORT),
        }),
      },
      {
        name: 'USER_SERVICE',
        ...clientProvider({
          queueName: azkaban_user,
          noAck: process.env.BROKER_ACK === 'yes' ? true : false,
          brokerUsername: process.env.BROKER_USERNAME,
          brokerPassword: process.env.BROKER_PASSWORD,
          brokerHost: process.env.BROKER_HOST,
          brokerPort: parseInt(process.env.BROKER_PORT),
        }),
      },
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
