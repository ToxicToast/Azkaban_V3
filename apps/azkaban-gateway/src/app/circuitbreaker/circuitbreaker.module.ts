import { Module } from '@nestjs/common';
import { CircuitBreakerService } from './circuitbreaker.service';

@Module({
  providers: [CircuitBreakerService],
  exports: [CircuitBreakerService],
})
export class CircuitBreakerModule {}
