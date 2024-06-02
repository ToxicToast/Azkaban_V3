import { Inject, Injectable } from '@nestjs/common';
import { CircuitBreakerService } from '../circuitbreaker/circuitbreaker.service';
import { ClientProxy } from '@nestjs/microservices';
import { AuthTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthDAO } from '@azkaban/auth-infrastructure';

@Injectable()
export class AuthService {
  constructor(
    private readonly circuitbreaker: CircuitBreakerService,
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
  ) {}

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<AuthDAO> {
    return this.circuitbreaker.execute(AuthTopics.REGISTER, async () => {
      return await this.client
        .send(AuthTopics.REGISTER, { email, username, password })
        .toPromise();
    });
  }

  async login(username: string, password: string): Promise<AuthDAO> {
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

  async activateAccount(email: string, token: string): Promise<void> {
    return this.circuitbreaker.execute(AuthTopics.ACTIVATE, async () => {
      return await this.client
        .send(AuthTopics.ACTIVATE, { email, token })
        .toPromise();
    });
  }

  async deactivateAccount(id: string): Promise<void> {
    return this.circuitbreaker.execute(AuthTopics.DEACTIVATE, async () => {
      return await this.client.send(AuthTopics.DEACTIVATE, { id }).toPromise();
    });
  }

  async deleteAccount(id: string): Promise<void> {
    return this.circuitbreaker.execute(AuthTopics.DELETE, async () => {
      return await this.client.send(AuthTopics.DELETE, { id }).toPromise();
    });
  }
}
