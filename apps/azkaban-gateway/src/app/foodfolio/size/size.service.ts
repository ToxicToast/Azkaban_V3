import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { SizeDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioSizeTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class SizeService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @Inject('SIZE_SERVICE') private readonly client: ClientProxy,
        private readonly notifSerivce: NotifyService,
    ) {}

    async getSizes(limit: number, offset: number): Promise<Array<SizeDAO>> {
        const cacheKey = `${FoodfolioSizeTopics.LIST}:${limit}:${offset}`;
        const cachedData =
            await this.cacheManager.get<Array<SizeDAO>>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const data = await this.client
            .send(FoodfolioSizeTopics.LIST, { limit, offset })
            .toPromise();
        await this.cacheManager.set(cacheKey, data);
        return data;
    }

    async getSizeById(id: string): Promise<SizeDAO> {
        const cacheKey = `${FoodfolioSizeTopics.ID}:${id}`;
        const cachedData = await this.cacheManager.get<SizeDAO>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const data = await this.client
            .send(FoodfolioSizeTopics.ID, { id })
            .toPromise();
        await this.cacheManager.set(cacheKey, data);
        return data;
    }

    async createSize(title: string): Promise<SizeDAO> {
        return await this.client
            .send(FoodfolioSizeTopics.CREATE, { title })
            .toPromise()
            .then((category) => {
                this.notifSerivce.onCreateSize(category.id, category.title);
                return category;
            });
    }

    async updateSize(
        id: string,
        title?: Optional<string>,
        activated_at?: Optional<Nullable<Date>>,
    ): Promise<SizeDAO> {
        return await this.client
            .send(FoodfolioSizeTopics.UPDATE, {
                id,
                title,
                activated_at,
            })
            .toPromise();
    }

    async deleteSize(id: string): Promise<SizeDAO> {
        return await this.client
            .send(FoodfolioSizeTopics.DELETE, { id })
            .toPromise();
    }

    async restoreSize(id: string): Promise<SizeDAO> {
        return await this.client
            .send(FoodfolioSizeTopics.RESTORE, { id })
            .toPromise();
    }
}
