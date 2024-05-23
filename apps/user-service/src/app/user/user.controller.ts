import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Optional } from '@toxictoast/azkaban-base-types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @MessagePattern(UserTopics.LIST)
  async getUserList(
    @Payload('limit') limit: number,
    @Payload('offset') offset: number,
  ) {
    try {
      return await this.service.getUsers(limit, offset);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern(UserTopics.ID)
  async getUserById(@Payload('id') id: string) {
    try {
      return await this.service.getUserById(id);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern(UserTopics.EMAIL)
  async getUserByEmail(@Payload('email') email: string) {
    try {
      return await this.service.getUserByEmail(email);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern(UserTopics.CREATE)
  async createUser(
    @Payload('email') email: string,
    @Payload('username') username: string,
    @Payload('password') password: string,
  ) {
    try {
      return await this.service.createUser(email, username, password);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern(UserTopics.UPDATE)
  async updateUser(
    @Payload('id') id: string,
    @Payload('email') email?: Optional<string>,
    @Payload('username') username?: Optional<string>,
    @Payload('password') password?: Optional<string>,
  ) {
    try {
      return await this.service.updateUser(id, email, username, password);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern(UserTopics.DELETE)
  async deleteUser(@Payload('id') id: string) {
    try {
      return await this.service.deleteUser(id);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern(UserTopics.RESTORE)
  async restoreUser(@Payload('id') id: string) {
    try {
      return await this.service.restoreUser(id);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern(UserTopics.LOGIN)
  async loginUser(
    @Payload('username') username: string,
    @Payload('password') password: string,
  ) {
    try {
      return await this.service.loginUser(username, password);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern(UserTopics.ACTIVATE)
  async loginUser(
    @Payload('username') username: string,
    @Payload('password') password: string,
  ) {
    try {
      return await this.service.loginUser(username, password);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
