import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
    AuthTopics,
    FoodfolioCategoryTopics,
    FoodfolioCompanyTopics,
    FoodfolioLocationTopics,
    FoodfolioProductDetailTopics,
    FoodfolioProductTopics,
    FoodfolioSizeTopics,
    FoodfolioTypeTopics,
    FoodfolioWarehouseTopics,
    GroupsTopics,
    NotifyTopics,
    UserTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class VersionService {
    constructor(
        @Inject('WEBHOOKS_SERVICE') private readonly hooksClient: ClientProxy,
        @Inject('APIALERTS_SERVICE')
        private readonly apialertsClient: ClientProxy,
        @Inject('NOTIFICATIONS_SERVICE')
        private readonly notificationsClient: ClientProxy,
        @Inject('SSE_SERVICE') private readonly sseClient: ClientProxy,
        //
        @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
        @Inject('GROUP_SERVICE') private readonly groupClient: ClientProxy,
        //
        @Inject('FOODFOLIO_CATEGORY_SERVICE')
        private readonly foodfolioCategoryClient: ClientProxy,
        @Inject('FOODFOLIO_COMPANY_SERVICE')
        private readonly foodfolioCompanyClient: ClientProxy,
        @Inject('FOODFOLIO_LOCATION_SERVICE')
        private readonly foodfolioLocationClient: ClientProxy,
        @Inject('FOODFOLIO_SIZE_SERVICE')
        private readonly foodfolioSizeClient: ClientProxy,
        @Inject('FOODFOLIO_TYPE_SERVICE')
        private readonly foodfolioTypeClient: ClientProxy,
        @Inject('FOODFOLIO_ITEM_SERVICE')
        private readonly foodfolioItemClient: ClientProxy,
        @Inject('FOODFOLIO_ITEM_DETAIL_SERVICE')
        private readonly foodfolioItemDetailClient: ClientProxy,
        @Inject('FOODFOLIO_WAREHOUSE_SERVICE')
        private readonly foodfolioWarehouseClient: ClientProxy,
        //
        @Inject('APP_VERSION') private readonly appVersion: string,
    ) {}

    getGatewayVersion() {
        return {
            gateway: this.appVersion,
        };
    }

    async getWebhooksVersion() {
        return await this.hooksClient
            .send(NotifyTopics.VERSION, {})
            .toPromise();
    }

    async getApiAlertsVersion() {
        return await this.apialertsClient
            .send(NotifyTopics.VERSION, {})
            .toPromise();
    }

    async getNotificationsVersion() {
        return await this.notificationsClient
            .send(NotifyTopics.VERSION, {})
            .toPromise();
    }

    async getSSEVersion() {
        return await this.sseClient.send(NotifyTopics.VERSION, {}).toPromise();
    }

    async getUsersVersion() {
        return await this.usersClient.send(UserTopics.VERSION, {}).toPromise();
    }

    async getAuthVersion() {
        return await this.authClient.send(AuthTopics.VERSION, {}).toPromise();
    }

    async getGroupsVersion() {
        return await this.groupClient
            .send(GroupsTopics.VERSION, {})
            .toPromise();
    }

    async getFoodFolioCategoryVersion() {
        return await this.foodfolioCategoryClient
            .send(FoodfolioCategoryTopics.VERSION, {})
            .toPromise();
    }

    async getFoodFolioCompanyVersion() {
        return await this.foodfolioCompanyClient
            .send(FoodfolioCompanyTopics.VERSION, {})
            .toPromise();
    }

    async getFoodFolioLocationVersion() {
        return await this.foodfolioLocationClient
            .send(FoodfolioLocationTopics.VERSION, {})
            .toPromise();
    }

    async getFoodFolioSizeVersion() {
        return await this.foodfolioSizeClient
            .send(FoodfolioSizeTopics.VERSION, {})
            .toPromise();
    }

    async getFoodFolioTypeVersion() {
        return await this.foodfolioTypeClient
            .send(FoodfolioTypeTopics.VERSION, {})
            .toPromise();
    }

    async getFoodFolioItemVersion() {
        return await this.foodfolioItemClient
            .send(FoodfolioProductTopics.VERSION, {})
            .toPromise();
    }

    async getFoodFolioItemDetailVersion() {
        return await this.foodfolioItemDetailClient
            .send(FoodfolioProductDetailTopics.VERSION, {})
            .toPromise();
    }

    async getFoodFolioWarehouseVersion() {
        return await this.foodfolioWarehouseClient
            .send(FoodfolioWarehouseTopics.VERSION, {})
            .toPromise();
    }
}
