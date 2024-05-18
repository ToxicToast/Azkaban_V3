import { Inject, Injectable } from '@nestjs/common';
import { CircuitBreakerService } from '../circuitbreaker/circuitbreaker.service';
import { UserTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    private readonly circuitbreaker: CircuitBreakerService,
    @Inject('USERS_SERVICE') private readonly client: ClientProxy
  ) {}

  async getUsers(limit: number, offset: number): Promise<void> {
    return this.circuitbreaker.execute(UserTopics.LIST, async () => {
      return await this.client
        .send(UserTopics.LIST, { limit, offset })
        .toPromise();
    });
  }
}
