import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthAlertsService } from './auth-alerts.service';

@Controller()
export class AlertsController {
  constructor(private readonly authAlerts: AuthAlertsService) {}

  private onUserCreated(event: string, data: unknown): void {
    if (event === 'user-created') {
      Logger.debug({ event, data });
      this.authAlerts.onUserCreated(data);
    }
  }

  private onUserDeactivated(event: string, data: unknown): void {
    if (event === 'user-deactivated') {
      Logger.debug({ event, data });
      this.authAlerts.onUserDeactivated(data);
    }
  }

  private onUserDeleted(event: string, data: unknown): void {
    if (event === 'user-deleted') {
      Logger.debug({ event, data });
      this.authAlerts.onUserDeleted(data);
    }
  }

  @EventPattern(NotifyTopics.APIALERTS)
  async notifyApiAlerts(alert: {
    event: string;
    data: unknown;
  }): Promise<void> {
    const { event, data } = alert;
    this.onUserCreated(event, data);
    this.onUserDeactivated(event, data);
    this.onUserDeleted(event, data);
    switch (event) {
      default:
        Logger.debug({ event, data });
        break;
      case 'user-restored':
        this.authAlerts.onUserRestored(data);
        break;
      case 'user-login':
        this.authAlerts.onUserLogin(data);
        break;
    }
  }
}
