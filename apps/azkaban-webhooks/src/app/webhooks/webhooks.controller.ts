import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller('webhooks')
export class WebhooksController {
  constructor(
    @Inject('APIALERTS_SERVICE') private readonly apialerts: ClientProxy,
    @Inject('SSE_SERVICE') private readonly sse: ClientProxy,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notification: ClientProxy,
  ) {}

  private async notifyApiAlerts(event: string, data: unknown) {
    await this.apialerts
      .emit(NotifyTopics.APIALERTS, { event, data })
      .toPromise();
  }

  private async notifyDatabase(service: string, event: string, data: unknown) {
    await this.notification
      .emit(NotifyTopics.DATABASE, { service, event, data })
      .toPromise();
  }

  private async notifySSE(event: string, data: unknown) {
    await this.sse.emit(NotifyTopics.SSE, { event, data }).toPromise();
  }

  @EventPattern(NotifyTopics.NOTIFY)
  async notifyAlerts(
    @Payload('service') service: string,
    @Payload('event') event: string,
    @Payload('data') data: unknown,
  ): Promise<void> {
    await this.notifyDatabase(service, event, data);
    await this.notifyApiAlerts(event, data);
    await this.notifySSE(event, data);
  }
}
