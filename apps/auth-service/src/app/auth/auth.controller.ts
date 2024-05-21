import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AuthTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @MessagePattern(AuthTopics.REGISTER)
  async register(
    @Payload('username') username: string,
    @Payload('email') email: string,
    @Payload('password') password: string
  ) {
    try {
      return await this.service.register(username, email, password);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern(AuthTopics.LOGIN)
  async login(
    @Payload('username') username: string,
    @Payload('password') password: string
  ) {
    try {
      return await this.service.login(username, password);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern(AuthTopics.FORGOT_PASSWORD)
  async forgotPassword(@Payload('email') email: string) {
    try {
      return await this.service.forgotPassword(email);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
