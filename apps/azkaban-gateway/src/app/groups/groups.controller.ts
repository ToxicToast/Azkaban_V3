import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GroupsService } from './groups.service';
import { Optional } from '@toxictoast/azkaban-base-types';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCommand, UpdateCommand } from './commands';

@ApiTags('group')
@UseGuards(ThrottlerGuard)
@Controller('group')
export class GroupsController {
  constructor(
    private readonly service: GroupsService,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getGroups(
    @Query('limit') limit?: Optional<number>,
    @Query('offset') offset?: Optional<number>,
  ) {
    const limitNumber = limit ?? 50;
    const offsetNumber = offset ?? 0;
    return await this.service.getGroups(limitNumber, offsetNumber);
  }

  @Get('id/:id')
  async getGroupById(@Param('id') id: string) {
    return await this.service.getGroupById(id);
  }

  @Post()
  async createGroup(@Body('title') title: string) {
    try {
      return await this.commandBus.execute(new CreateCommand(title));
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }

  @Put(':id')
  async updateGroup(
    @Param('id') id: string,
    @Body('title') title?: Optional<string>,
    @Body('slug') slug?: Optional<string>,
    @Body('active') active?: Optional<boolean>,
  ) {
    try {
      return await this.commandBus.execute(
        new UpdateCommand(id, title, slug, active),
      );
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }

  @Delete(':id')
  async deleteGroup(@Param('id') id: string) {
    return await this.service.deleteGroup(id);
  }

  @Put('restore/:id')
  async restoreGroup(@Param('id') id: string) {
    return await this.service.restoreGroup(id);
  }
}
