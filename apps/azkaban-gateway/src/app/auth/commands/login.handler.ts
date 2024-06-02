import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { AuthService } from '../auth.service';
import { HttpException } from '@nestjs/common';
import { LoggedEvent } from '../events';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly service: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand) {
    try {
      const { username, password } = command;
      const user = await this.service.login(username, password);
      await this.eventBus.publish(new LoggedEvent(user.username));
      //
      const payload = {
        id: user.id,
        username: user.username,
        sub: user.id,
        email: user.email,
        groups: user.groups,
      };
      //
      return {
        token: this.jwtService.sign(payload),
        user,
      };
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }
}
