import { Controller } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller()
export class WebhooksController {
  constructor(private readonly service: WebhooksService) {}

  @MessagePattern(NotifyTopics.NOTIFY)
  async notifyApiAlerts(
    @Payload('event') event: string,
    @Payload('data') data: unknown
  ): Promise<void> {
    await this.service.sendToApiAlerts(event, data);
    await this.service.sendToSSE(event, data);
  }
}
