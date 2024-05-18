import CircuitBreaker from 'opossum';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';

@Injectable()
export class CircuitBreakerService {
  async execute<T>(
    name: string,
    callFunction: any,
    shouldNotThrow?: boolean
  ): Promise<T> {
    const circuitbreaker = new CircuitBreaker(callFunction, {
      timeout: 3000,
      errorThresholdPercentage: 50,
      resetTimeout: 5000,
      name,
    });
    circuitbreaker.fallback(() => {
      if (shouldNotThrow === true) {
        return 'Service Unavailable';
      }
      throw new ServiceUnavailableException(`${name} is not available`);
    });
    return (await circuitbreaker.fire()) as T;
  }
}
