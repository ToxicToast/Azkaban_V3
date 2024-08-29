import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CharsetMiddleware } from './middleware/charset.middleware';

async function createApp(): Promise<INestApplication> {
	return await NestFactory.create(AppModule, {
		cors: true,
		snapshot: true,
		rawBody: true,
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

function configureSwagger(app: INestApplication): void {
	const config = new DocumentBuilder()
		.setTitle('Azkaban')
		.setDescription('Home Microservices')
		.setVersion('0.0.1')
		.addBearerAuth()
		.addOAuth2()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	//
	SwaggerModule.setup('api', app, document);
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
	await app.listen(port);
	Logger.log(`🚀 Listening on Port: ${port}`);
}

async function bootstrap() {
	const environment = process.env.NODE_ENV;
	const app = await createApp();
	configureApp(app);
	addModules(app);
	if (environment === 'development') {
		configureSwagger(app);
	}
	configureCors(app);
	await startApp(app);
	Logger.log(`🚀 Azkaban-Gateway is running`);
	Logger.log(`🚀 Version: ${process.env.APP_VERSION}`);
	Logger.log(`🚀 Environment: ${environment}`);
}
bootstrap().catch((err) => Logger.error(err));
