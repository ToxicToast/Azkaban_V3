import CircuitBreaker from 'opossum';
import {
  HttpException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class CircuitBreakerService {
  async execute<T>(
    name: string,
    callFunction: any,
    shouldNotThrow?: boolean,
  ): Promise<T> {
    const circuitbreaker = new CircuitBreaker(callFunction, {
      timeout: 3000,
      errorThresholdPercentage: 50,
      resetTimeout: 5000,
      name,
    });
    /*circuitbreaker.fallback(() => {
      if (shouldNotThrow === true) {
        return 'Service Unavailable';
      }
      throw new ServiceUnavailableException(`${name} is not available`);
    });*/
    const fired = await circuitbreaker.fire();
    if (fired instanceof Error) {
      if (shouldNotThrow === true) {
        return 'Service Unavailable' as unknown as T;
      }
      throw new HttpException(fired.message, 500);
    }
    return fired as unknown as T;
    // return (await circuitbreaker.fire()) as T;
  }
}
