import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { TypeDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioTypeTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class TypeService {
    constructor(
        @Inject('TYPE_SERVICE') private readonly client: ClientProxy,
        private readonly notifSerivce: NotifyService,
    ) {}

    async getTypes(limit: number, offset: number): Promise<Array<TypeDAO>> {
        return await this.client
            .send(FoodfolioTypeTopics.LIST, { limit, offset })
            .toPromise();
    }

    async getTypeById(id: string): Promise<TypeDAO> {
        return await this.client
            .send(FoodfolioTypeTopics.ID, { id })
            .toPromise();
    }

    async createType(title: string): Promise<TypeDAO> {
        return await this.client
            .send(FoodfolioTypeTopics.CREATE, { title })
            .toPromise()
            .then((category) => {
                this.notifSerivce.onCreateType(category.id, category.title);
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
