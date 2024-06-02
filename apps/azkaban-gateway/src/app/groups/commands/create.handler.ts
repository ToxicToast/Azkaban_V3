import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommand } from './create.command';
import { GroupsService } from '../groups.service';
import { HttpException } from '@nestjs/common';
import { CreatedEvent } from '../events/created.event';

@CommandHandler(CreateCommand)
export class CreateHandler implements ICommandHandler<CreateCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly service: GroupsService,
  ) {}

  async execute(command: CreateCommand) {
    try {
      const { title } = command;
      const group = await this.service.createGroup(title);
      await this.eventBus.publish(new CreatedEvent(group.id, group.title));
      return group;
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }
}
