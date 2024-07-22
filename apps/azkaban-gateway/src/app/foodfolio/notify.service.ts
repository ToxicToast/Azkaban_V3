import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
    FoodfolioCategoryTopics,
    FoodfolioCompanyTopics,
    FoodfolioLocationTopics,
    FoodfolioProductTopics,
    FoodfolioSizeTopics,
    FoodfolioTypeTopics,
    FoodfolioWarehouseTopics,
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

    async onCreateCompany(id: string, title: string): Promise<void> {
        const notifyPayload = {
            service: 'foodfolio-company-service',
            event: FoodfolioCompanyTopics.CREATE,
            data: {
                id,
                title,
            },
        };
        await this.client.emit(NotifyTopics.NOTIFY, notifyPayload).toPromise();
    }

    async onCreateLocation(id: string, title: string): Promise<void> {
        const notifyPayload = {
            service: 'foodfolio-location-service',
            event: FoodfolioLocationTopics.CREATE,
            data: {
                id,
                title,
            },
        };
        await this.client.emit(NotifyTopics.NOTIFY, notifyPayload).toPromise();
    }

    async onCreateSize(id: string, title: string): Promise<void> {
        const notifyPayload = {
            service: 'foodfolio-size-service',
            event: FoodfolioSizeTopics.CREATE,
            data: {
                id,
                title,
            },
        };
        await this.client.emit(NotifyTopics.NOTIFY, notifyPayload).toPromise();
    }

    async onCreateType(id: string, title: string): Promise<void> {
        const notifyPayload = {
            service: 'foodfolio-type-service',
            event: FoodfolioTypeTopics.CREATE,
            data: {
                id,
                title,
            },
        };
        await this.client.emit(NotifyTopics.NOTIFY, notifyPayload).toPromise();
    }

    async onCreateItem(id: string, title: string): Promise<void> {
        const notifyPayload = {
            service: 'foodfolio-item-service',
            event: FoodfolioProductTopics.CREATE,
            data: {
                id,
                title,
            },
        };
        await this.client.emit(NotifyTopics.NOTIFY, notifyPayload).toPromise();
    }

    async onCreateWarehouse(id: string, title: string): Promise<void> {
        const notifyPayload = {
            service: 'foodfolio-warehouse-service',
            event: FoodfolioWarehouseTopics.CREATE,
            data: {
                id,
                title,
            },
        };
        await this.client.emit(NotifyTopics.NOTIFY, notifyPayload).toPromise();
    }
}
