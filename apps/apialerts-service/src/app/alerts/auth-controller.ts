import { Controller, Logger } from '@nestjs/common';
import { AuthAlertsService } from './auth-alerts.service';
import { EventPattern } from '@nestjs/microservices';
import { AuthTopics, NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller('alerts/auth')
export class AuthController {
  constructor(private readonly authAlerts: AuthAlertsService) {}

  @EventPattern(NotifyTopics.APIALERTS)
  onUserCreated(alert: { event: string; data: unknown }): void {
    const { event, data } = alert;
    if (event === AuthTopics.REGISTER) {
      Logger.debug({ event, data }, AuthController.name);
      this.authAlerts.onUserCreated(data);
    }
    return null;
  }

  @EventPattern(NotifyTopics.APIALERTS)
  onUserLogin(alert: { event: string; data: unknown }): void {
    const { event, data } = alert;
    if (event === AuthTopics.LOGIN) {
      Logger.debug({ event, data }, AuthController.name);
      this.authAlerts.onUserLogin(data);
    }
    return null;
  }
}
