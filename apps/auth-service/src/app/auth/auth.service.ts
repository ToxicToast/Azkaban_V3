import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  AuthTopics,
  NotifyTopics,
  UserTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    @Inject('NOTIFY_SERVICE') private readonly notifyClient: ClientProxy
  ) {}

  async register(username: string, email: string, password: string) {
    return await this.usersClient
      .send(UserTopics.CREATE, {
        username,
        email,
        password,
      })
      .toPromise()
      .then((res) => {
        this.onNewRegister(res.id, username);
        return res;
      });
  }

  async login(username: string, password: string): Promise<void> {
    return await this.usersClient
      .send(UserTopics.LOGIN, {
        username,
        password,
      })
      .toPromise()
      .then((res) => {
        this.onNewLogin(username);
        return res;
      });
  }

  async forgotPassword(email: string): Promise<void> {
    Logger.debug({ email }, AuthService.name);
  }

  private async onNewRegister(id: string, username: string): Promise<void> {
    Logger.debug({ id, username }, this.onNewRegister.name);
    await this.notifyClient
      .emit(NotifyTopics.NOTIFY, {
        service: 'auth-service',
        event: AuthTopics.REGISTER,
        data: {
          id,
          username,
        },
      })
      .toPromise();
  }

  private async onNewLogin(username: string): Promise<void> {
    Logger.debug({ username }, this.onNewLogin.name);
    await this.notifyClient
      .emit(NotifyTopics.NOTIFY, {
        service: 'auth-service',
        event: AuthTopics.LOGIN,
        data: {
          username,
        },
      })
      .toPromise();
  }
}
