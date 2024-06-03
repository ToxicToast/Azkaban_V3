import { Injectable } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Injectable()
export class GroupAlertsService {
  constructor(private readonly service: AlertsService) {}

  onGroupCreated(data: unknown): void {
    const eventData = data as { title: string };
    const message = `New Group: ${eventData.title}`;
    const tags = ['azkaban', 'group', 'create'];
    this.service.sendAlert(message, tags);
  }
}
