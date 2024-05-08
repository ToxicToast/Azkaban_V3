import { Injectable, Logger } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  async register(
    email: string,
    username: string,
    password: string
  ): Promise<void> {
    this.logger.debug({ email, username, password });
  }

  async login(username: string, password: string): Promise<void> {
    this.logger.debug({ username, password });
  }

  async forgotPassword(email: string): Promise<void> {
    this.logger.debug({ email });
  }

  async updateSettings(
    email?: Optional<string>,
    password?: Optional<string>
  ): Promise<void> {
    this.logger.debug({ email, password });
  }
}
