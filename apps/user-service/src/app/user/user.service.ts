import { Injectable } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class UserService {
  async getUsers(limit: number, offset: number) {
    return { limit, offset };
  }

  async getUserById(id: string) {
    return { id };
  }

  async getUserByEmail(email: string) {
    return { email };
  }

  async createUser(email: string, username: string, password: string) {
    return { email, username, password };
  }

  async updateUser(
    id: string,
    email?: Optional<string>,
    username?: Optional<string>,
    password?: Optional<string>
  ) {
    return { id, email, username, password };
  }

  async deleteUser(id: string) {
    return { id };
  }

  async restoreUser(id: string) {
    return { id };
  }

  async loginUser(username: string, password: string) {
    return { username, password };
  }
}
