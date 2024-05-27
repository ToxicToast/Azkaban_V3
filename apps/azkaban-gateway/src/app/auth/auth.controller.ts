import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  HttpException,
  Logger,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { LoginCommand, RegisterCommand } from './commands';
import { LoggedEvent, RegisteredEvent } from './events';
import { AuthDAO } from '@azkaban/auth-infrastructure';
import { AuthGuard } from '../../guards/auth.guard';

@ApiTags('auth')
@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<AuthDAO> {
    try {
      return await this.commandBus.execute(
        new RegisterCommand(email, username, password),
      );
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    try {
      return await this.commandBus.execute(
        new LoginCommand(username, password),
      );
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }

  @Put('activate')
  async activateAccount(
    @Body('email') email: string,
    @Body('token') token: string,
  ) {
    try {
      return await this.service.activateAccount(email, token);
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Put('deactivate')
  async deactivateAccount(@Req() req) {
    try {
      return await this.service.deactivateAccount(req.user.id);
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async deleteAccount(@Req() req) {
    try {
      return await this.service.deleteAccount(req.user.id);
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Unknown Error',
        error.status ?? 500,
      );
    }
  }
}
