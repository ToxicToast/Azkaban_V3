import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller()
export class WebhooksController {
  @MessagePattern(NotifyTopics.NOTIFY)
  async notifyApiAlerts(
    @Payload('event') event: string,
    @Payload('data') data: unknown
  ): Promise<void> {
    Logger.debug({ event, data });
  }
}
