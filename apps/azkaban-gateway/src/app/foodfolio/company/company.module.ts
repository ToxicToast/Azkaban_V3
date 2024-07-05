import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import {
    azkaban_notify,
    clientProvider,
    foodfolio_company,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CachingModule } from '../../core/caching.module';

@Module({
    imports: [
        CachingModule,
        JwtModule,
        ClientsModule.register([
            {
                name: 'COMPANY_SERVICE',
                ...clientProvider({
                    queueName: foodfolio_company,
                    noAck: process.env.BROKER_ACK === 'yes' ? true : false,
                    brokerUsername: process.env.BROKER_USERNAME,
                    brokerPassword: process.env.BROKER_PASSWORD,
                    brokerHost: process.env.BROKER_HOST,
                    brokerPort: parseInt(process.env.BROKER_PORT),
                    consumerTag: 'foodfolio-company',
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
                    consumerTag: 'foodfolio-company-notify',
                }),
            },
        ]),
    ],
    controllers: [CompanyController],
    providers: [AuthGuard, NotifyService, CompanyService],
})
export class CompanyModule {}
