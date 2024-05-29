import CircuitBreaker from 'opossum';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';

@Injectable()
export class CircuitBreakerService {
  init(name: string, callFunction: any) {
    return new CircuitBreaker(callFunction, {
      timeout: 4000,
      name,
      allowWarmUp: true,
      cache: true,
      cacheTTL: 1000 * 60 * 5,
      resetTimeout: 100,
      rollingPercentilesEnabled: true,
      capacity: 3,
    });
  }

  setFallback(circuit: CircuitBreaker): CircuitBreaker {
    circuit.fallback(() => {
      throw new ServiceUnavailableException('Service Unavailable');
    });
    return circuit;
  }

  async execute<T>(
    name: string,
    callFunction: any,
    shouldNotThrow?: boolean,
  ): Promise<T> {
    const circuit = this.init(name, callFunction);
    const fired = await circuit.fire();
    if (fired instanceof Error) {
      if (shouldNotThrow === true) {
        return 'Service Unavailable' as unknown as T;
      }
      throw new ServiceUnavailableException(fired.message);
    }
    return fired as unknown as T;
  }
}
