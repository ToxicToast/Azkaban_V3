import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LoggedEvent } from './logged.event';
import { NotifyService } from '../notify.service';

@EventsHandler(LoggedEvent)
export class LoggedHandler implements IEventHandler<LoggedEvent> {
  constructor(private readonly notify: NotifyService) {}

  async handle(event: LoggedEvent): Promise<void> {
    const { username } = event;
    await this.notify.onLogin(username);
  }
}
