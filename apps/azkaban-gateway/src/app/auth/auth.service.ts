import { Inject, Injectable } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';
import { ClientRMQ } from '@nestjs/microservices';
import { AuthTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { CircuitBreakerService } from '../circuitbreaker/circuitbreaker.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly circuitbreaker: CircuitBreakerService,
    @Inject('AZKABAN_SERVICE') private readonly client: ClientRMQ
  ) {}

  async register(
    email: string,
    username: string,
    password: string
  ): Promise<unknown> {
    return this.circuitbreaker.execute(AuthTopics.REGISTER, async () => {
      return await this.client
        .send(AuthTopics.REGISTER, { email, username, password })
        .toPromise();
    });
  }

  async login(username: string, password: string): Promise<unknown> {
    return this.circuitbreaker.execute(AuthTopics.LOGIN, async () => {
      return await this.client
        .send(AuthTopics.LOGIN, { username, password })
        .toPromise();
    });
  }

  async forgotPassword(email: string): Promise<void> {
    return this.circuitbreaker.execute(AuthTopics.FORGOT_PASSWORD, async () => {
      return await this.client
        .send(AuthTopics.FORGOT_PASSWORD, { email })
        .toPromise();
    });
  }

  async updateSettings(
    email?: Optional<string>,
    password?: Optional<string>
  ): Promise<void> {
    return this.circuitbreaker.execute(AuthTopics.UPDATE_SETTINGS, async () => {
      return await this.client
        .send(AuthTopics.UPDATE_SETTINGS, { email, password })
        .toPromise();
    });
  }
}
