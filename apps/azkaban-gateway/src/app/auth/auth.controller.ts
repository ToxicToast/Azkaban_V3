import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpException,
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
    @Body('password') password: string
  ) {
    return await this.service.register(email, username, password);
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    try {
      return await this.service.login(username, password);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return await this.service.forgotPassword(email);
  }
}
