import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CircuitBreakerModule } from '../circuitbreaker/circuitbreaker.module';
import { ClientsModule } from '@nestjs/microservices';
import {
  azkaban_auth,
  clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthService } from './auth.service';

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
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
