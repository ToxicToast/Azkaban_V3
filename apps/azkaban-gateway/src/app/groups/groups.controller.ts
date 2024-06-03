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
import { AuthGuard, GroupsGuard } from '../../guards';
import { Groups } from '../../decorators';

@ApiTags('group')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('group')
export class GroupsController {
  constructor(private readonly service: GroupsService) {}

  @Groups('Admin')
  @Get()
  async getGroups(
    @Query('limit') limit?: Optional<number>,
    @Query('offset') offset?: Optional<number>,
  ) {
    try {
      const limitNumber = limit ?? 50;
      const offsetNumber = offset ?? 0;
      return await this.service.getGroups(limitNumber, offsetNumber);
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }

  @Groups('Admin')
  @Get('id/:id')
  async getGroupById(@Param('id') id: string) {
    try {
      return await this.service.getGroupById(id);
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }

  @Groups('Admin')
  @Post()
  async createGroup(@Body('title') title: string) {
    try {
      return await this.service.createGroup(title);
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }

  @Groups('Admin')
  @Put(':id')
  async updateGroup(
    @Param('id') id: string,
    @Body('title') title?: Optional<string>,
    @Body('slug') slug?: Optional<string>,
    @Body('active') active?: Optional<boolean>,
  ) {
    try {
      return await this.service.updateGroup(id, title, slug, active);
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }

  @Groups('Admin')
  @Delete(':id')
  async deleteGroup(@Param('id') id: string) {
    try {
      return await this.service.deleteGroup(id);
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }

  @Groups('Admin')
  @Put('restore/:id')
  async restoreGroup(@Param('id') id: string) {
    try {
      return await this.service.restoreGroup(id);
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }
}
