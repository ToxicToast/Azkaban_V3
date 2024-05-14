import { Injectable } from '@nestjs/common';
import { CircuitBreakerService } from '../circuitbreaker/circuitbreaker.service';
import { UserTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class UsersService {
  constructor(private readonly circuitbreaker: CircuitBreakerService) {}

  async getUsers(limit: number, offset: number): Promise<void> {
    return this.circuitbreaker.execute(UserTopics.LIST, async () => {
      /*
      return await this.client
        .send(UserTopics.LIST, { limit, offset })
        .toPromise();
       */
      return false;
    });
  }

  async getUserById(id: string): Promise<void> {
    return this.circuitbreaker.execute(UserTopics.ID, async () => {
      /*
      return await this.client.send(UserTopics.LIST, { id }).toPromise();
       */
      return false;
    });
  }
}
