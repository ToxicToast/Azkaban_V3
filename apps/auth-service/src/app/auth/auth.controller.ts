import { Controller, Logger } from '@nestjs/common';
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
        @Payload('password') password: string,
    ) {
        try {
            return await this.service.createAuth(email, username, password);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(AuthTopics.LOGIN)
    async login(
        @Payload('username') username: string,
        @Payload('password') password: string,
    ) {
        try {
            return await this.service.login(username, password);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(AuthTopics.FORGOT_PASSWORD)
    async forgotPassword(@Payload('email') email: string) {
        Logger.debug({ email });
    }

    @MessagePattern(AuthTopics.ACTIVATE)
    async activateAccount(
        @Payload('email') email: string,
        @Payload('token') token: string,
    ) {
        try {
            return await this.service.activateAccount(email, token);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(AuthTopics.DEACTIVATE)
    async deactivateAccount(@Payload('id') id: string) {
        Logger.debug({ id });
    }

    @MessagePattern(AuthTopics.DELETE)
    async deleteAccount(@Payload('id') id: string) {
        Logger.debug({ id });
    }
}
