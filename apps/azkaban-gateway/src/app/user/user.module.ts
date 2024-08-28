import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule } from '@nestjs/microservices';
import {
	azkaban_user,
	clientProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { CachingModule } from '../core/caching.module';

const brokerDefaultSettings = {
	noAck: process.env.BROKER_ACK === 'yes' ? true : false,
	brokerUsername: process.env.BROKER_USERNAME,
	brokerPassword: process.env.BROKER_PASSWORD,
	brokerHost: process.env.BROKER_HOST,
	brokerPort: parseInt(process.env.BROKER_PORT),
	brokerVHost: process.env.BROKER_VHOST,
};

@Module({
	imports: [
		CachingModule,
		JwtModule,
		ClientsModule.register([
			{
				name: 'USERS_SERVICE',
				...clientProvider({
					queueName: azkaban_user,
					consumerTag: 'gateway-user',
					...brokerDefaultSettings,
				}),
			},
		]),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
