import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CircuitBreakerModule } from '../circuitbreaker/circuitbreaker.module';
import { ClientsModule } from '@nestjs/microservices';
import {
  azkaban_auth,
  azkaban_notify,
  clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';
import { CqrsModule } from '@nestjs/cqrs';
import { LoginHandler, RegisterHandler } from './commands';
import { LoggedHandler, RegisteredHandler } from './events';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const commandHandlers = [RegisterHandler, LoginHandler];
const eventHandlers = [RegisteredHandler, LoggedHandler];

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET', 'secret'),
          signOptions: { expiresIn: '1h' },
        };
      },
      inject: [ConfigService],
    }),
    CqrsModule,
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
  controllers: [AuthController],
  providers: [
    AuthGuard,
    AuthService,
    NotifyService,
    ...commandHandlers,
    ...eventHandlers,
  ],
})
export class AuthModule {}
