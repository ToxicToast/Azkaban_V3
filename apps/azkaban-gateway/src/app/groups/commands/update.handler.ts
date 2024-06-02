import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCommand } from './update.command';
import { GroupsService } from '../groups.service';
import { HttpException } from '@nestjs/common';

@CommandHandler(UpdateCommand)
export class UpdateHandler implements ICommandHandler<UpdateCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly service: GroupsService,
  ) {}

  async execute(command: UpdateCommand) {
    try {
      const { id, title, slug, active } = command;
      return await this.service.updateGroup(id, title, slug, active);
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }
}
