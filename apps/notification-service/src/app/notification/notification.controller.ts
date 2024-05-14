import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller()
export class NotificationController {
  @EventPattern(NotifyTopics.DATABASE)
  async notification(
    @Payload('event') event: string,
    @Payload('data') data: unknown,
    @Ctx() context: RmqContext
  ): Promise<void> {
    Logger.debug({ event, data }, NotificationController.name);
  }
}
