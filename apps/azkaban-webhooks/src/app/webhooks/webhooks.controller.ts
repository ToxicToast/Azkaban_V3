import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller()
export class WebhooksController {
  constructor(
    @Inject('AZKABAN_SERVICE') private readonly broker: ClientProxy
  ) {}

  @EventPattern(NotifyTopics.NOTIFY)
  async notifyApiAlerts(
    @Payload('event') event: string,
    @Payload('data') data: unknown
  ): Promise<void> {
    Logger.debug({ event, data });
    await this.broker.emit(NotifyTopics.APIALERTS, { event, data }).toPromise();
  }
}
