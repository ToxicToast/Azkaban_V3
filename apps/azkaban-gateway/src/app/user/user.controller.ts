import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { Optional } from '@toxictoast/azkaban-base-types';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@UseGuards(ThrottlerGuard)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

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
    return { id };
    // return await this.service.getUserById(id);
  }
}
