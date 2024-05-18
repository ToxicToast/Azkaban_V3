import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller()
export class AlertsController {
    @EventPattern(NotifyTopics.APIALERTS)
    async notifyApiAlerts(alert: {
        event: string;
        data: unknown;
    }): Promise<void> {
        const { event, data } = alert;
        Logger.debug({ event, data }, AlertsController.name);
    }
}
