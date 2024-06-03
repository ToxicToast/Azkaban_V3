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

@ApiTags('group')
@UseGuards(ThrottlerGuard)
@Controller('group')
export class GroupsController {
  constructor(private readonly service: GroupsService) {}

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
