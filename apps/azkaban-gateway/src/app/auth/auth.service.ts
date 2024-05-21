import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CircuitBreakerService } from '../circuitbreaker/circuitbreaker.service';
import { ClientProxy } from '@nestjs/microservices';
import { AuthTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class AuthService {
  constructor(
    private readonly circuitbreaker: CircuitBreakerService,
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy
  ) {}

  async register(email: string, username: string, password: string) {
    return this.circuitbreaker.execute(AuthTopics.REGISTER, async () => {
      return await this.client
        .send(AuthTopics.REGISTER, { email, username, password })
        .toPromise();
    });
  }

  async login(username: string, password: string) {
    return this.circuitbreaker.execute(AuthTopics.LOGIN, async () => {
      return await this.client
        .send(AuthTopics.LOGIN, { username, password })
        .toPromise();
    });
  }

  async forgotPassword(email: string) {
    return this.circuitbreaker.execute(AuthTopics.FORGOT_PASSWORD, async () => {
      return await this.client
        .send(AuthTopics.FORGOT_PASSWORD, { email })
        .toPromise();
    });
  }
}
