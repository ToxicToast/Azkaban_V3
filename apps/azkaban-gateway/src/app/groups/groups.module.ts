import { Module } from '@nestjs/common';
import { CircuitBreakerModule } from '../circuitbreaker/circuitbreaker.module';
import { ClientsModule } from '@nestjs/microservices';
import {
  azkaban_group,
  clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';

@Module({
  imports: [
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
    ]),
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
