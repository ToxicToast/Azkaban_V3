import { Controller, Get, HttpException, Inject } from '@nestjs/common';
import {
	HealthCheck,
	HealthCheckService,
	MemoryHealthIndicator,
	MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { RedisOptions, Transport } from '@nestjs/microservices';
import { azkaban } from '@toxictoast/azkaban-broker-rabbitmq';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('monitoring')
@Controller('health')
export class HealthController {
	constructor(
		@Inject('MEMORY_HEAP_TRESHOLD') private readonly heapTreshold: number,
		@Inject('MEMORY_RSS_TRESHOLD') private readonly rssTreshold: number,
		@Inject('BROKER_CONNECTION_STRING')
		private readonly brokerConnectionString: string,
		@Inject('REDIS_HOST_STRING')
		private readonly redisHostString: string,
		@Inject('REDIS_PORT_NUMBER')
		private readonly redisPortNumber: number,
		@Inject('REDIS_PASSWORD_STRING')
		private readonly redisPasswordString: string,
		private readonly service: HealthCheckService,
		private readonly memory: MemoryHealthIndicator,
		private readonly microservices: MicroserviceHealthIndicator,
	) {}

	@Get()
	@HealthCheck()
	check() {
		try {
			return this.service.check([
				() => this.memory.checkHeap('memory_heap', this.heapTreshold),
				() => this.memory.checkRSS('memory_rss', this.rssTreshold),
				() =>
					this.microservices.pingCheck('rabbitmq', {
						transport: Transport.RMQ,
						options: {
							urls: [this.brokerConnectionString],
							queue: azkaban,
							consumerTag: 'gateway-health',
						},
					}),
				() =>
					this.microservices.pingCheck<RedisOptions>('redis', {
						transport: Transport.REDIS,
						options: {
							host: this.redisHostString,
							port: this.redisPortNumber,
							password: this.redisPasswordString,
						},
					}),
			]);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
