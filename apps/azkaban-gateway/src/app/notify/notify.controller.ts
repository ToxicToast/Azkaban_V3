import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ClientRMQ } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@UseGuards(ThrottlerGuard)
@Controller()
export class NotifyController {
  constructor(@Inject('AZKABAN_SERVICE') private readonly client: ClientRMQ) {}

  @Post()
  async notify(
    @Body('event') event: string,
    @Body('data') data: unknown
  ): Promise<void> {
    await this.client.emit(NotifyTopics.NOTIFY, { event, data }).toPromise();
  }
}
