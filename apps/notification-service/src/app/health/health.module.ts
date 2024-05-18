import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: 'MEMORY_HEAP_TRESHOLD',
      useValue: process.env.MEMORY_HEAP_TRESHOLD,
    },
    {
      provide: 'MEMORY_RSS_TRESHOLD',
      useValue: process.env.MEMORY_RSS_TRESHOLD,
    },
    {
      provide: 'BROKER_CONNECTION_STRING',
      useValue: `amqp://${process.env.BROKER_USERNAME}:${process.env.BROKER_PASSWORD}@${process.env.BROKER_HOST}:${process.env.BROKER_PORT}`,
    },
  ],
})
export class HealthModule {}
