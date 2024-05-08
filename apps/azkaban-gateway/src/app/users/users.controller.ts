import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Optional } from '@toxictoast/azkaban-base-types';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getUsers(
    @Query('limit') limit?: Optional<number>,
    @Query('offset') offset?: Optional<number>
  ) {
    const limitNumber = limit ?? 50;
    const offsetNumber = offset ?? 0;
    return await this.service.getUsers(limitNumber, offsetNumber);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.service.getUserById(id);
  }
}
