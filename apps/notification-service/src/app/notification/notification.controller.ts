import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller()
export class NotificationController {
    @EventPattern(NotifyTopics.DATABASE)
    async notification(
        @Payload('service') service: string,
        @Payload('event') event: string,
        @Payload('data') data: unknown
    ): Promise<void> {
        Logger.debug({ service, event, data }, NotificationController.name);
    }
}
