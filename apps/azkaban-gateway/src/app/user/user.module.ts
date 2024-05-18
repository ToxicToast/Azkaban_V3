import { Module } from '@nestjs/common';
import { CircuitBreakerModule } from '../circuitbreaker/circuitbreaker.module';
import { UserController } from './user.controller';
import { ClientsModule } from '@nestjs/microservices';
import {
  azkaban_user,
  clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { UserService } from './user.service';

@Module({
  imports: [
    CircuitBreakerModule,
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        ...clientProvider({
          queueName: azkaban_user,
          noAck: process.env.BROKER_ACK === 'yes' ? true : false,
          brokerUsername: process.env.BROKER_USERNAME,
          brokerPassword: process.env.BROKER_PASSWORD,
          brokerHost: process.env.BROKER_HOST,
          brokerPort: parseInt(process.env.BROKER_PORT),
        }),
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}