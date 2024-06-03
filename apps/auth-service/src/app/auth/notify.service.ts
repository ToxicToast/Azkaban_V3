import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthTopics, NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class NotifyService {
  constructor(@Inject('NOTIFY_SERVICE') private readonly client: ClientProxy) {}

  async onRegister(id: string, username: string, email: string): Promise<void> {
    const notifyPayload = {
      service: 'auth-service',
      event: AuthTopics.REGISTER,
      data: {
        id,
        username,
        email,
      },
    };
    await this.client.emit(NotifyTopics.NOTIFY, notifyPayload).toPromise();
  }

  async onLogin(username: string): Promise<void> {
    const notifyPayload = {
      service: 'auth-service',
      event: AuthTopics.LOGIN,
      data: {
        username,
      },
    };
    await this.client.emit(NotifyTopics.NOTIFY, notifyPayload).toPromise();
  }
}
