import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import {
    azkaban_notify,
    clientProvider,
    foodfolio_category,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';

@Module({
    imports: [
        JwtModule,
        ClientsModule.register([
            {
                name: 'CATEGORY_SERVICE',
                ...clientProvider({
                    queueName: foodfolio_category,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                    consumerTag: 'foodfolio-category',
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
                    consumerTag: 'foodfolio-category-notify',
                }),
            },
        ]),
    ],
    controllers: [CategoryController],
    providers: [AuthGuard, CategoryService, NotifyService],
})
export class CategoryModule {}
