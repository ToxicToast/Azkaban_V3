import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RegisteredEvent } from './registered.event';
import { NotifyService } from '../notify.service';

@EventsHandler(RegisteredEvent)
export class RegisteredHandler implements IEventHandler<RegisteredEvent> {
  constructor(private readonly notify: NotifyService) {}

  async handle(event: RegisteredEvent): Promise<void> {
    const { id, username, email } = event;
    await this.notify.onRegister(id, username, email);
  }
}
