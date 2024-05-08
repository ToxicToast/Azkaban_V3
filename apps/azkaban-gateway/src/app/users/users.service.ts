import { Inject, Injectable } from '@nestjs/common';
import { CircuitBreakerService } from '../circuitbreaker/circuitbreaker.service';
import { ClientRMQ } from '@nestjs/microservices';
import { UserTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class UsersService {
  constructor(
    private readonly circuitbreaker: CircuitBreakerService,
    @Inject('AZKABAN_SERVICE') private readonly client: ClientRMQ
  ) {}

  async getUsers(limit: number, offset: number): Promise<void> {
    return this.circuitbreaker.execute(UserTopics.LIST, async () => {
      return await this.client
        .send(UserTopics.LIST, { limit, offset })
        .toPromise();
    });
  }

  async getUserById(id: string): Promise<void> {
    return this.circuitbreaker.execute(UserTopics.ID, async () => {
      return await this.client.send(UserTopics.LIST, { id }).toPromise();
    });
  }
}
