import { Module } from '@nestjs/common';
import { CircuitBreakerModule } from '../circuitbreaker/circuitbreaker.module';
import { ClientsModule } from '@nestjs/microservices';
import {
  azkaban_group,
  azkaban_notify,
  clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { NotifyService } from './notify.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateHandler, UpdateHandler } from './commands';
import { CreatedHandler } from './events';
import { JwtModule, JwtService } from '@nestjs/jwt';

const commandHandlers = [CreateHandler, UpdateHandler];
const eventHandlers = [CreatedHandler];

@Module({
  imports: [
    JwtModule,
    CqrsModule,
    CircuitBreakerModule,
    ClientsModule.register([
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
        name: 'NOTIFY_SERVICE',
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
  controllers: [GroupsController],
  providers: [
    AuthGuard,
    GroupsService,
    NotifyService,
    ...commandHandlers,
    ...eventHandlers,
  ],
})
export class GroupsModule {}
