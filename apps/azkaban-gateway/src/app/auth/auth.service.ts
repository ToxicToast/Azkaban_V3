import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthDAO, TokenDAO } from '@azkaban/auth-infrastructure';
import { JwtService } from '@nestjs/jwt';
import { NotifyService } from './notify.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly notifSerivce: NotifyService,
  ) {}

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<AuthDAO> {
    return await this.client
      .send(AuthTopics.REGISTER, { email, username, password })
      .toPromise()
      .then((user) => {
        this.notifSerivce.onRegister(user.id, user.username, user.email);
        return user;
      });
  }

  async login(username: string, password: string): Promise<TokenDAO> {
    return await this.client
      .send(AuthTopics.LOGIN, { username, password })
      .toPromise()
      .then((user) => {
        this.notifSerivce.onLogin(user.username);
        const payload = {
          id: user.id,
          username: user.username,
          sub: user.id,
          email: user.email,
          groups: user.groups,
        };
        return {
          token: this.jwtService.sign(payload),
          user,
        };
      });
  }

  async activateAccount(email: string, token: string): Promise<void> {
    return await this.client
      .send(AuthTopics.ACTIVATE, { email, token })
      .toPromise();
  }

  async deactivateAccount(id: string): Promise<void> {
    return await this.client.send(AuthTopics.DEACTIVATE, { id }).toPromise();
  }

  async deleteAccount(id: string): Promise<void> {
    return await this.client.send(AuthTopics.DELETE, { id }).toPromise();
  }
}
