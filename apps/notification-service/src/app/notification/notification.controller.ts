import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @EventPattern(NotifyTopics.DATABASE)
  async notification(
    @Payload('service') service: string,
    @Payload('event') event: string,
    @Payload('data') data: unknown
  ): Promise<void> {
    return await this.service.createNotification(service, event, data);
  }
}
