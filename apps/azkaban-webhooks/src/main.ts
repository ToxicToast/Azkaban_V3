import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function createApp(): Promise<INestApplication> {
  return await NestFactory.create(AppModule, {
    cors: true,
    snapshot: true,
    rawBody: true,
  });
}

async function createMicroservice(app: INestApplication): Promise<void> {
  const queue = 'azkaban_webhook_queue';
  const connectionString = `amqp://${process.env.BROKER_USERNAME}:${process.env.BROKER_PASSWORD}@${process.env.BROKER_HOST}:${process.env.BROKER_PORT}`;
  const noAck = process.env.BROKER_ACK === 'yes' ? true : false;
  //
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      queue: queue,
      queueOptions: {
        durable: true,
      },
      urls: [connectionString],
      noAck: noAck,
    },
  });
}

function configureApp(app: INestApplication): void {
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableShutdownHooks();
}

async function startApp(app: INestApplication): Promise<void> {
  const port = process.env.PORT ?? 3000;
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
