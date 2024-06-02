import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedEvent } from './created.event';
import { NotifyService } from '../notify.service';

@EventsHandler(CreatedEvent)
export class CreatedHandler implements IEventHandler<CreatedEvent> {
  constructor(private readonly notify: NotifyService) {}

  async handle(event: CreatedEvent): Promise<void> {
    const { id, title } = event;
    await this.notify.onCreate(id, title);
  }
}
