import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Optional } from '@toxictoast/azkaban-base-types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @MessagePattern(UserTopics.LIST)
  async getUserList(
    @Payload('limit') limit: number,
    @Payload('offset') offset: number
  ) {
    return await this.service.getUsers(limit, offset);
  }

  @MessagePattern(UserTopics.ID)
  async getUserById(@Payload('id') id: string) {
    return await this.service.getUserById(id);
  }

  @MessagePattern(UserTopics.EMAIL)
  async getUserByEmail(@Payload('email') email: string) {
    return await this.service.getUserByEmail(email);
  }

  @MessagePattern(UserTopics.CREATE)
  async createUser(
    @Payload('email') email: string,
    @Payload('username') username: string,
    @Payload('password') password: string
  ) {
    return await this.service.createUser(email, username, password);
  }

  @MessagePattern(UserTopics.UPDATE)
  async updateUser(
    @Payload('id') id: string,
    @Payload('email') email?: Optional<string>,
    @Payload('username') username?: Optional<string>,
    @Payload('password') password?: Optional<string>
  ) {
    return await this.service.updateUser(id, email, username, password);
  }

  @MessagePattern(UserTopics.DELETE)
  async deleteUser(@Payload('id') id: string) {
    return await this.service.deleteUser(id);
  }

  @MessagePattern(UserTopics.RESTORE)
  async restoreUser(@Payload('id') id: string) {
    return await this.service.restoreUser(id);
  }

  @MessagePattern(UserTopics.LOGIN)
  async loginUser(
    @Payload('username') username: Optional<string>,
    @Payload('password') password: Optional<string>
  ) {
    return await this.service.loginUser(username, password);
  }
}
