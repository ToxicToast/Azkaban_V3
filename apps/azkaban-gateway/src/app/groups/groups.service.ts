import { Injectable, Logger } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class GroupsService {
  private readonly logger: Logger = new Logger(GroupsService.name);

  async getGroups(limit: number, offset: number): Promise<void> {
    this.logger.debug({ limit, offset });
  }

  async getGroupById(id: string): Promise<void> {
    this.logger.debug({ id });
  }

  async createGroup(title: string, active?: Optional<boolean>): Promise<void> {
    this.logger.debug({ title, active });
  }

  async updateGroup(
    id: string,
    title?: Optional<string>,
    active?: Optional<boolean>
  ): Promise<void> {
    this.logger.debug({ id, title, active });
  }

  async deleteGroup(id: string): Promise<void> {
    this.logger.debug({ id });
  }

  async restoreGroup(id: string): Promise<void> {
    this.logger.debug({ id });
  }
}
