import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { CategoryDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioCategoryTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class CategoryService {
    constructor(
        @Inject('GROUP_SERVICE') private readonly client: ClientProxy,
        private readonly notifSerivce: NotifyService,
    ) {}

    async getCategories(
        limit: number,
        offset: number,
    ): Promise<Array<CategoryDAO>> {
        return await this.client
            .send(FoodfolioCategoryTopics.LIST, { limit, offset })
            .toPromise();
    }

    async getCategoryByParentId(
        parent_id: Nullable<string>,
    ): Promise<Array<CategoryDAO>> {
        return await this.client
            .send(FoodfolioCategoryTopics.PARENT, { parent_id })
            .toPromise();
    }

    async getCategoryById(id: string): Promise<CategoryDAO> {
        return await this.client
            .send(FoodfolioCategoryTopics.ID, { id })
            .toPromise();
    }

    async createCategory(
        title: string,
        parent_id?: Optional<Nullable<string>>,
    ): Promise<CategoryDAO> {
        return await this.client
            .send(FoodfolioCategoryTopics.CREATE, { title, parent_id })
            .toPromise()
            .then((category) => {
                this.notifSerivce.onCreateCategory(category.id, category.title);
                return category;
            });
    }

    async updateCategory(
        id: string,
        title?: Optional<string>,
        parent_id?: Optional<Nullable<string>>,
        activated_at?: Optional<Nullable<Date>>,
    ): Promise<CategoryDAO> {
        return await this.client
            .send(FoodfolioCategoryTopics.UPDATE, {
                id,
                title,
                parent_id,
                activated_at,
            })
            .toPromise();
    }

    async deleteCategory(id: string): Promise<CategoryDAO> {
        return await this.client
            .send(FoodfolioCategoryTopics.DELETE, { id })
            .toPromise();
    }

    async restoreCategory(id: string): Promise<CategoryDAO> {
        return await this.client
            .send(FoodfolioCategoryTopics.RESTORE, { id })
            .toPromise();
    }
}
