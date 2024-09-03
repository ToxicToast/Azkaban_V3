import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
	azkaban_notify_sse,
	azkaban_vhost,
	consumerProvider,
} from '@toxictoast/azkaban-broker-rabbitmq';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

async function createApp(): Promise<INestApplication> {
	return await NestFactory.create(AppModule, {
		cors: true,
		snapshot: true,
		rawBody: true,
	});
}

async function createMicroservice(app: INestApplication): Promise<void> {
	const noAck = process.env.BROKER_ACK === 'yes' ? true : false;
	//
	app.connectMicroservice({
		...consumerProvider({
			queueName: azkaban_notify_sse,
			noAck: noAck,
			brokerUsername: process.env.BROKER_USERNAME,
			brokerPassword: process.env.BROKER_PASSWORD,
			brokerHost: process.env.BROKER_HOST,
			brokerPort: parseInt(process.env.BROKER_PORT),
			brokerVHost: azkaban_vhost,
		}),
	});
}

function configureApp(app: INestApplication): void {
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);
	app.enableShutdownHooks();
	app.enableVersioning({
		type: VersioningType.URI,
	});
}

function addModules(app: INestApplication): void {
	app.use(compression({}));
	app.use(helmet());
	app.use(cookieParser());
}

function configureCors(app: INestApplication): void {
	app.enableCors({
		origin: '*',
		maxAge: 3600,
		optionsSuccessStatus: 200,
	});
}

async function startApp(app: INestApplication): Promise<void> {
	const port = process.env.PORT ?? 3000;
	await app.startAllMicroservices();
	await app.listen(port);
	Logger.log(`🚀 Listening on Port: ${port}`);
}

async function bootstrap() {
	const app = await createApp();
	configureApp(app);
	addModules(app);
	configureCors(app);
	await createMicroservice(app);
	await startApp(app);
	Logger.log(`🚀 Azkaban-Webhooks-SSE is running`);
	Logger.log(`🚀 Version: ${process.env.APP_VERSION}`);
}
bootstrap().catch((err) => Logger.error(err));
