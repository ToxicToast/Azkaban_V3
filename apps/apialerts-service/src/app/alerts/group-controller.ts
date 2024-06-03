import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  GroupsTopics,
  NotifyTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { GroupAlertsService } from './group-alerts.service';

@Controller('alerts/group')
export class GroupController {
  constructor(private readonly groupAlerts: GroupAlertsService) {}

  @EventPattern(NotifyTopics.APIALERTS)
  onGroupCreated(alert: { event: string; data: unknown }): void {
    const { event, data } = alert;
    if (event === GroupsTopics.CREATE) {
      this.groupAlerts.onGroupCreated(data);
    }
    return null;
  }
}
