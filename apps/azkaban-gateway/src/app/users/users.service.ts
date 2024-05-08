import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  async getUsers(limit: number, offset: number): Promise<void> {
    this.logger.debug({ limit, offset });
  }

  async getUserById(id: string): Promise<void> {
    this.logger.debug({ id });
  }
}
