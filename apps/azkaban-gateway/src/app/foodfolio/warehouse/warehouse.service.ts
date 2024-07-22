import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { WarehouseDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioWarehouseTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class WarehouseService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        @Inject('WAREHOUSE_SERVICE') private readonly client: ClientProxy,
        private readonly notifySerivce: NotifyService,
    ) {}

    async getWarehouses(
        limit: number,
        offset: number,
    ): Promise<Array<WarehouseDAO>> {
        const cacheKey = `${FoodfolioWarehouseTopics.LIST}:${limit}:${offset}`;
        const cachedData =
            await this.cacheManager.get<Array<WarehouseDAO>>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const data = await this.client
            .send(FoodfolioWarehouseTopics.LIST, { limit, offset })
            .toPromise();
        await this.cacheManager.set(cacheKey, data);
        return data;
    }

    async getWarehouseById(id: string): Promise<WarehouseDAO> {
        const cacheKey = `${FoodfolioWarehouseTopics.ID}:${id}`;
        const cachedData = await this.cacheManager.get<WarehouseDAO>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const data = await this.client
            .send(FoodfolioWarehouseTopics.ID, { id })
            .toPromise();
        await this.cacheManager.set(cacheKey, data);
        return data;
    }

    async createWarehouse(title: string): Promise<WarehouseDAO> {
        return await this.client
            .send(FoodfolioWarehouseTopics.CREATE, { title })
            .toPromise()
            .then((warehouse) => {
                this.notifySerivce.onCreateWarehouse(
                    warehouse.id,
                    warehouse.title,
                );
                return warehouse;
            });
    }

    async updateWarehouse(
        id: string,
        title?: Optional<string>,
        activated_at?: Optional<Nullable<Date>>,
    ): Promise<WarehouseDAO> {
        return await this.client
            .send(FoodfolioWarehouseTopics.UPDATE, {
                id,
                title,
                activated_at,
            })
            .toPromise();
    }

    async deleteWarehouse(id: string): Promise<WarehouseDAO> {
        return await this.client
            .send(FoodfolioWarehouseTopics.DELETE, { id })
            .toPromise();
    }

    async restoreWarehouse(id: string): Promise<WarehouseDAO> {
        return await this.client
            .send(FoodfolioWarehouseTopics.RESTORE, { id })
            .toPromise();
    }
}
