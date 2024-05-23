import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';

@ApiTags('auth')
@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    try {
      return await this.service.register(email, username, password);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    try {
      return await this.service.login(username, password);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    try {
      return await this.service.forgotPassword(email);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('activate-user')
  async activateUser(
    @Body('email') email: string,
    @Body('token') token: string,
  ) {
    try {
      return await this.service.activateUser(email, token);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('ban-user/:id')
  async banUser(@Param('id') id: string) {
    try {
      return await this.service.banUser(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
