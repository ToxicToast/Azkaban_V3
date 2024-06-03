import { Controller, Get, Inject } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';
import { azkaban_notify_notification } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller('health')
export class HealthController {
  constructor(
    @Inject('MEMORY_HEAP_TRESHOLD') private readonly heapTreshold: number,
    @Inject('MEMORY_RSS_TRESHOLD') private readonly rssTreshold: number,
    @Inject('BROKER_CONNECTION_STRING')
    private readonly brokerConnectionString: string,
    private readonly service: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly microservices: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.service.check([
      () => this.memory.checkHeap('memory_heap', this.heapTreshold),
      () => this.memory.checkRSS('memory_rss', this.rssTreshold),
      () =>
        this.microservices.pingCheck('rabbitmq', {
          transport: Transport.RMQ,
          timeout: 5000,
          options: {
            urls: [this.brokerConnectionString],
            queue: azkaban_notify_notification,
          },
        }),
    ]);
  }
}
