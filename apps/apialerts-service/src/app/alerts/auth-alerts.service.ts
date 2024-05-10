import { Injectable } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Injectable()
export class AuthAlertsService {
  constructor(private readonly service: AlertsService) {}

  onUserCreated(data: unknown): void {
    const eventData = data as { username: string };
    const message = `New User: ${eventData.username}`;
    const tags = ['azkaban', 'auth', 'register'];
    this.service.sendAlert(message, tags);
  }
}
