import { Injectable } from '@nestjs/common';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class CategoryService {
    constructor() {}

    async getList(limit: number, offset: number): Promise<Array<any>> {
        return [];
    }

    async getById(id: string): Promise<any> {
        return {};
    }

    async getByParentId(parent_id: Nullable<string>): Promise<Array<any>> {
        return [];
    }

    async createCategory(
        title: string,
        parent_id?: Optional<string>,
    ): Promise<any> {
        return {};
    }

    async updateCategory(
        id: string,
        title?: Optional<string>,
        parent_id?: Optional<string>,
        activated_at?: Optional<Date>,
    ): Promise<any> {
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
        return {};
    }

    async restoreCategory(id: string): Promise<any> {
        return {};
    }
}
