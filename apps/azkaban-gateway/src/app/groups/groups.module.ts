import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
    azkaban_group,
    azkaban_notify,
    clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { NotifyService } from './notify.service';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule,
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
                    consumerTag: 'gateway-group',
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
                    consumerTag: 'gateway-group-notify',
                }),
            },
        ]),
    ],
    controllers: [GroupsController],
    providers: [AuthGuard, GroupsService, NotifyService],
})
export class GroupsModule {}
