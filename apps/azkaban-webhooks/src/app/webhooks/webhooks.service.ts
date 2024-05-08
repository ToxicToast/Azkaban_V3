import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class WebhooksService {
  private readonly logger: Logger = new Logger(WebhooksService.name);

  constructor(@Inject('AZKABAN_SERVICE') private readonly client: ClientRMQ) {}

  async sendToApiAlerts(event: string, data: unknown): Promise<void> {
    await this.client.emit(NotifyTopics.APIALERTS, { event, data }).toPromise();
  }

  async sendToSSE(event: string, data: unknown): Promise<void> {
    await this.client.emit(NotifyTopics.SSE, { event, data }).toPromise();
  }
}
