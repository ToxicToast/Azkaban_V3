import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Optional } from '@toxictoast/azkaban-base-types';

@UseGuards(ThrottlerGuard)
@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    return this.service.register(email, username, password);
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    return this.service.login(username, password);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.service.forgotPassword(email);
  }

  @Post('update-settings')
  async updateSettings(
    @Body('email') email?: Optional<string>,
    @Body('password') password?: Optional<string>
  ) {
    return this.service.updateSettings(email, password);
  }
}
