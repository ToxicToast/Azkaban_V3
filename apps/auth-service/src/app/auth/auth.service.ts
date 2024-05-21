import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    Logger.debug({ username, email, password }, AuthService.name);
  }

  async login(username: string, password: string): Promise<void> {
    Logger.debug({ username, password }, AuthService.name);
  }

  async forgotPassword(email: string): Promise<void> {
    Logger.debug({ email }, AuthService.name);
  }
}
