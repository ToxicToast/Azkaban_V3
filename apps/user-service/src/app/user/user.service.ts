import { Injectable } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class UserService {
  async getUsers(limit: number, offset: number) {
    return { request: this.getUsers.name, limit, offset };
  }

  async getUserById(id: string) {
    return { request: this.getUserById.name, id };
  }

  async getUserByEmail(email: string) {
    return { request: this.getUserByEmail.name, email };
  }

  async createUser(email: string, username: string, password: string) {
    return { request: this.createUser.name, email, username, password };
  }

  async updateUser(
    id: string,
    email?: Optional<string>,
    username?: Optional<string>,
    password?: Optional<string>
  ) {
    return { request: this.updateUser.name, id, email, username, password };
  }

  async deleteUser(id: string) {
    return { request: this.deleteUser.name, id };
  }

  async restoreUser(id: string) {
    return { request: this.restoreUser.name, id };
  }

  async loginUser(username: string, password: string) {
    return { request: this.loginUser.name, username, password };
  }
}
