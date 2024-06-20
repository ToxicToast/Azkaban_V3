import { Injectable, Logger } from '@nestjs/common';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class CategoryService {
    async getList(limit: number, offset: number): Promise<Array<any>> {
        Logger.log({ limit, offset }, 'CategoryService.getList');
        return [];
    }

    async getById(id: string): Promise<any> {
        Logger.log({ id }, 'CategoryService.getById');
        return {};
    }

    async getByParentId(parent_id: Nullable<string>): Promise<Array<any>> {
        Logger.log({ parent_id }, 'CategoryService.getByParentId');
        return [];
    }

    async createCategory(
        title: string,
        parent_id?: Optional<string>,
    ): Promise<any> {
        Logger.log({ title, parent_id }, 'CategoryService.createCategory');
        return {};
    }

    async updateCategory(
        id: string,
        title?: Optional<string>,
        parent_id?: Optional<string>,
        activated_at?: Optional<Date>,
    ): Promise<any> {
        Logger.log(
            { id, title, parent_id, activated_at },
            'CategoryService.updateCategory',
        );
        if (title !== undefined) {
            //
        }
        if (parent_id !== undefined) {
            //
        }
        if (activated_at !== undefined) {
            //
        }
    }

    async deleteCategory(id: string): Promise<any> {
        Logger.log({ id }, 'CategoryService.deleteCategory');
        return {};
    }

    async restoreCategory(id: string): Promise<any> {
        Logger.log({ id }, 'CategoryService.restoreCategory');
        return {};
    }
}
