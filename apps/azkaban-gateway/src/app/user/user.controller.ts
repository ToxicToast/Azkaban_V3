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

import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
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
    @Query('offset') offset?: Optional<number>,
  ) {
    const limitNumber = limit ?? 50;
    const offsetNumber = offset ?? 0;
    return await this.service.getUsers(limitNumber, offsetNumber);
  }

  @Get('id/:id')
  async getUserById(@Param('id') id: string) {
    return await this.service.getUserById(id);
  }

  @Post()
  async createUser(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.service.createUser(email, username, password);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body('email') email?: Optional<string>,
    @Body('username') username?: Optional<string>,
    @Body('password') password?: Optional<string>,
    @Body('activation_token') activation_token?: Optional<string>,
    @Body('activated_at') activated_at?: Optional<Nullable<Date>>,
    @Body('banned_at') banned_at?: Optional<Nullable<Date>>,
  ) {
    return await this.service.updateUser(
      id,
      email,
      username,
      password,
      activation_token,
      activated_at,
      banned_at,
    );
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.service.deleteUser(id);
  }

  @Put('restore/:id')
  async restoreUser(@Param('id') id: string) {
    return await this.service.restoreUser(id);
  }
}
