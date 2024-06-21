import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
    FoodfolioCategoryTopics,
    NotifyTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class NotifyService {
    constructor(
        @Inject('NOTIFY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async onCreateCategory(id: string, title: string): Promise<void> {
        const notifyPayload = {
            service: 'foodfolio-category-service',
            event: FoodfolioCategoryTopics.CREATE,
            data: {
                id,
                title,
            },
        };
        await this.client.emit(NotifyTopics.NOTIFY, notifyPayload).toPromise();
    }
}
