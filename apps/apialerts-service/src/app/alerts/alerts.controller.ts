import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthAlertsService } from './auth-alerts.service';

@Controller()
export class AlertsController {
  constructor(private readonly authAlerts: AuthAlertsService) {}

  @EventPattern(NotifyTopics.NOTIFY)
  async notifyApiAlerts(alert: {
    event: string;
    data: unknown;
  }): Promise<void> {
    const { event, data } = alert;
    switch (event) {
      default:
        Logger.debug({ event, data });
        break;
      case 'user-created':
        this.authAlerts.onUserCreated(data);
        break;
    }
  }
}
