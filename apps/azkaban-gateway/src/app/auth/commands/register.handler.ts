import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';
import { AuthService } from '../auth.service';
import { HttpException } from '@nestjs/common';
import { RegisteredEvent } from '../events';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly service: AuthService,
  ) {}

  async execute(command: RegisterCommand) {
    try {
      const { email, username, password } = command;
      const user = await this.service.register(email, username, password);
      await this.eventBus.publish(
        new RegisteredEvent(user.id, user.username, user.email),
      );
      return user;
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }
}
