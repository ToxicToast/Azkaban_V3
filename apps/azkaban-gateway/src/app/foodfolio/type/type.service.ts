import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { TypeDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioTypeTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class TypeService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        @Inject('TYPE_SERVICE') private readonly client: ClientProxy,
        private readonly notifySerivce: NotifyService,
    ) {}

    async getTypes(limit: number, offset: number): Promise<Array<TypeDAO>> {
        const cacheKey = `${FoodfolioTypeTopics.LIST}:${limit}:${offset}`;
        const cachedData =
            await this.cacheManager.get<Array<TypeDAO>>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const data = await this.client
            .send(FoodfolioTypeTopics.LIST, { limit, offset })
            .toPromise();
        await this.cacheManager.set(cacheKey, data);
        return data;
    }

    async getTypeById(id: string): Promise<TypeDAO> {
        const cacheKey = `${FoodfolioTypeTopics.ID}:${id}`;
        const cachedData = await this.cacheManager.get<TypeDAO>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const data = await this.client
            .send(FoodfolioTypeTopics.ID, { id })
            .toPromise();
        await this.cacheManager.set(cacheKey, data);
        return data;
    }

    async createType(title: string): Promise<TypeDAO> {
        return await this.client
            .send(FoodfolioTypeTopics.CREATE, { title })
            .toPromise()
            .then((category) => {
                this.notifySerivce.onCreateType(category.id, category.title);
                return category;
            });
    }

    async updateType(
        id: string,
        title?: Optional<string>,
        activated_at?: Optional<Nullable<Date>>,
    ): Promise<TypeDAO> {
        return await this.client
            .send(FoodfolioTypeTopics.UPDATE, {
                id,
                title,
                activated_at,
            })
            .toPromise();
    }

    async deleteType(id: string): Promise<TypeDAO> {
        return await this.client
            .send(FoodfolioTypeTopics.DELETE, { id })
            .toPromise();
    }

    async restoreType(id: string): Promise<TypeDAO> {
        return await this.client
            .send(FoodfolioTypeTopics.RESTORE, { id })
            .toPromise();
    }
}
