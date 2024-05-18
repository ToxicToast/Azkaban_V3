import { Controller, Sse } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller('sse')
export class SseController {
  private readonly events$ = new Subject<MessageEvent>();

  private transformToMessageEvent(event: string, data: unknown): MessageEvent {
    return new MessageEvent(event, {
      data: {
        data,
      },
    });
  }

  @MessagePattern(NotifyTopics.SSE)
  onNotification(
    @Payload('event') event: string,
    @Payload('data') data: unknown
  ): void {
    const messageEvent = this.transformToMessageEvent(event, data);
    this.events$.next(messageEvent);
  }

  @Sse('/')
  onEvents(): Observable<MessageEvent> {
    return this.events$.asObservable();
  }
}
