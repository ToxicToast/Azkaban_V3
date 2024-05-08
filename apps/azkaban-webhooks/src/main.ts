import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { azkaban, consumerProvider } from '@toxictoast/azkaban-broker-rabbitmq';

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
      queueName: azkaban,
      noAck: noAck,
      brokerUsername: process.env.BROKER_USERNAME,
      brokerPassword: process.env.BROKER_PASSWORD,
      brokerHost: process.env.BROKER_HOST,
      brokerPort: parseInt(process.env.BROKER_PORT),
    }),
  });
}

function configureApp(app: INestApplication): void {
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableShutdownHooks();
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
  await createMicroservice(app);
  await startApp(app);
  Logger.log(`🚀 Azkaban-Webhooks is running`);
  Logger.log(`🚀 Version: ${process.env.APP_VERSION}`);
}
bootstrap().catch((err) => Logger.error(err));
