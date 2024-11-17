import { DynamicModule, Module } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';
import { ClientsModule } from '@nestjs/microservices';
import { clientProvider } from '@toxictoast/azkaban-broker-rabbitmq';

@Module({})
export class RabbitmqModule {
	static forRoot(options: {
		global?: Optional<boolean>;
		name: string;
		queueName: string;
		brokerVHost: string;
		noAck?: boolean;
		brokerUsername: string;
		brokerPassword: string;
		brokerHost: string;
		brokerPort: number;
	}): DynamicModule {
		const {
			global,
			name,
			queueName,
			brokerVHost,
			noAck,
			brokerUsername,
			brokerPassword,
			brokerHost,
			brokerPort,
		} = options;
		return {
			module: RabbitmqModule,
			imports: [
				ClientsModule.register([
					{
						name,
						...clientProvider({
							noAck: noAck ?? false,
							queueName,
							brokerVHost,
							brokerUsername,
							brokerPassword,
							brokerHost,
							brokerPort,
						}),
					},
				]),
			],
			exports: [ClientsModule],
			global: global ?? false,
		};
	}
}
