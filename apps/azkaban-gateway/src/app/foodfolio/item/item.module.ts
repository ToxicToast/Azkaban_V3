import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import {
    azkaban_notify,
    clientProvider,
    foodfolio_product,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { CachingModule } from '../../core/caching.module';

@Module({
    imports: [
        CachingModule,
        JwtModule,
        ClientsModule.register([
            {
                name: 'ITEM_SERVICE',
                ...clientProvider({
                    queueName: foodfolio_product,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                    consumerTag: 'foodfolio-item',
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
                    consumerTag: 'foodfolio-item-notify',
                }),
            },
        ]),
    ],
    controllers: [ItemController],
    providers: [AuthGuard, NotifyService, ItemService],
})
export class ItemModule {}
