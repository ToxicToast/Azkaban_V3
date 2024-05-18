import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async createNotification(
    service: string,
    event: string,
    data: unknown
  ): Promise<void> {
    Logger.debug({ service, event, data }, NotificationService.name);
  }
}
