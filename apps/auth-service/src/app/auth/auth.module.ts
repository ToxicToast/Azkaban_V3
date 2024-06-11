import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { authProvider, datasourceProvider } from '@azkaban/auth-infrastructure';
import { JwtModule } from '@nestjs/jwt';
import { NotifyService } from './notify.service';
import { ClientsModule } from '@nestjs/microservices';
import {
    azkaban_notify,
    clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => {
                return {
                    global: true,
                    secret: config.get('JWT_SECRET', 'secret'),
                    signOptions: { expiresIn: '1h' },
                };
            },
            inject: [ConfigService],
        }),
        ClientsModule.register([
            {
                name: 'NOTIFY_SERVICE',
                ...clientProvider({
                    queueName: azkaban_notify,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                    consumerTag: 'auth-notify',
                }),
            },
        ]),
    ],
    controllers: [AuthController],
    providers: [
        ...datasourceProvider,
        ...authProvider,
        AuthService,
        NotifyService,
    ],
})
export class AuthModule {}
