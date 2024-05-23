import { Inject, Injectable } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';
import {
  UserDAO,
  UserEntity,
  UserRepository,
  UserService as BaseService,
} from '@azkaban/user-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly infrastructureRepository: UserRepository;
  private readonly infrastructureService: BaseService;

  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.infrastructureRepository = new UserRepository(this.userRepository);
    this.infrastructureService = new BaseService(this.infrastructureRepository);
  }

  async getUsers(limit: number, offset: number): Promise<Array<UserDAO>> {
    return await this.infrastructureService.getUserList(limit, offset);
  }

  async getUserById(id: string): Promise<UserDAO> {
    return await this.infrastructureService.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<UserDAO> {
    return await this.infrastructureService.getUserByEmail(email);
  }

  async createUser(email: string, username: string, password: string) {
    return await this.infrastructureService.createUser({
      email,
      username,
      password,
    });
  }

  async updateUser(
    id: string,
    email?: Optional<string>,
    username?: Optional<string>,
    password?: Optional<string>,
  ) {
    if (email) {
      await this.infrastructureService.updateEmail(id, email);
    }
    if (username) {
      await this.infrastructureService.updateUsername(id, username);
    }
    if (password) {
      await this.infrastructureService.updatePassword(id, password);
    }
    return await this.infrastructureService.getUserById(id);
  }

  async deleteUser(id: string) {
    return await this.infrastructureService.deleteUser(id);
  }

  async restoreUser(id: string) {
    return await this.infrastructureService.restoreUser(id);
  }

  async loginUser(username: string, password: string) {
    return await this.infrastructureService.findUserByUsernameAndPassword(
      username,
      password,
    );
  }
}
