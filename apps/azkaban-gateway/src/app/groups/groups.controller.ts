import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GroupsService } from './groups.service';
import { Optional } from '@toxictoast/azkaban-base-types';

@UseGuards(ThrottlerGuard)
@Controller()
export class GroupsController {
  constructor(private readonly service: GroupsService) {}

  @Get()
  async getGroups(
    @Query('limit') limit?: Optional<number>,
    @Query('offset') offset?: Optional<number>
  ) {
    const limitNumber = limit ?? 50;
    const offsetNumber = offset ?? 0;
    return await this.service.getGroups(limitNumber, offsetNumber);
  }

  @Get(':id')
  async getGroup(@Param('id') id: string) {
    return await this.service.getGroupById(id);
  }

  @Post()
  async createGroup(
    @Body('title') title: string,
    @Body('active') active?: Optional<boolean>
  ) {
    return await this.service.createGroup(title, active);
  }

  @Put(':id')
  async updateGroup(
    @Param('id') id: string,
    @Body('title') title?: Optional<string>,
    @Body('active') active?: Optional<boolean>
  ) {
    return await this.service.updateGroup(id, title, active);
  }

  @Delete(':id')
  async deleteGroup(@Param('id') id: string) {
    return await this.service.deleteGroup(id);
  }

  @Put(':id/restore')
  async restoreGroup(@Param('id') id: string) {
    return await this.service.restoreGroup(id);
  }
}
