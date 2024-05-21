import { Controller, Logger } from '@nestjs/common';
import { AuthAlertsService } from './auth-alerts.service';
import { EventPattern } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller('alerts/auth')
export class AuthController {
  constructor(private readonly authAlerts: AuthAlertsService) {}

  @EventPattern(NotifyTopics.APIALERTS)
  onUserCreated(alert: { event: string; data: unknown }): void {
    const { event, data } = alert;
    if (event === 'user-created') {
      Logger.debug({ event, data }, AuthController.name);
      this.authAlerts.onUserCreated(data);
    }
    return null;
  }

  @EventPattern(NotifyTopics.APIALERTS)
  onUserDeactivated(alert: { event: string; data: unknown }): void {
    const { event, data } = alert;
    if (event === 'user-deactivated') {
      Logger.debug({ event, data }, AuthController.name);
      this.authAlerts.onUserDeactivated(data);
    }
    return null;
  }

  @EventPattern(NotifyTopics.APIALERTS)
  onUserDeleted(alert: { event: string; data: unknown }): void {
    const { event, data } = alert;
    if (event === 'user-deleted') {
      Logger.debug({ event, data }, AuthController.name);
      this.authAlerts.onUserDeleted(data);
    }
    return null;
  }

  @EventPattern(NotifyTopics.APIALERTS)
  onUserRestored(alert: { event: string; data: unknown }): void {
    const { event, data } = alert;
    if (event === 'user-restored') {
      Logger.debug({ event, data }, AuthController.name);
      this.authAlerts.onUserRestored(data);
    }
    return null;
  }

  @EventPattern(NotifyTopics.APIALERTS)
  onUserLogin(alert: { event: string; data: unknown }): void {
    const { event, data } = alert;
    if (event === 'user-login') {
      Logger.debug({ event, data }, AuthController.name);
      this.authAlerts.onUserLogin(data);
    }
    return null;
  }
}
