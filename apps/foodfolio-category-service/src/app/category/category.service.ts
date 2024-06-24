import { Inject, Injectable } from '@nestjs/common';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import {
    CategoryDAO,
    CategoryEntity,
    CategoryRepository,
    CategoryService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    private readonly infrastructureRepository: CategoryRepository;
    private readonly infrastructureService: BaseService;

    constructor(
        @Inject('CATEGORY_REPOSITORY')
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {
        this.infrastructureRepository = new CategoryRepository(
            this.categoryRepository,
        );
        this.infrastructureService = new BaseService(
            this.infrastructureRepository,
        );
    }

    async getList(limit: number, offset: number): Promise<Array<CategoryDAO>> {
        return await this.infrastructureService.getCategoryList(limit, offset);
    }

    async getById(id: string): Promise<CategoryDAO> {
        return await this.infrastructureService.getCategoryById(id);
    }

    async getByParentId(
        parent_id: Nullable<string>,
    ): Promise<Array<CategoryDAO>> {
        return await this.infrastructureService.getCategoryByParentId(
            parent_id,
        );
    }

    async createCategory(
        title: string,
        parent_id?: Optional<string>,
    ): Promise<CategoryDAO> {
        return await this.infrastructureService.createCategory({
            title,
            parent_id,
        });
    }

    async updateCategory(
        id: string,
        title?: Optional<string>,
        parent_id?: Optional<string>,
        activated_at?: Optional<Date>,
    ): Promise<CategoryDAO> {
        if (title !== undefined) {
            await this.infrastructureService.updateTitle(id, title);
        }
        if (parent_id !== undefined) {
            await this.infrastructureService.updateParentId(id, parent_id);
        }
        if (activated_at !== undefined) {
            await this.infrastructureService.updateActivatedAt(
                id,
                activated_at,
            );
        }
        return await this.infrastructureService.getCategoryById(id);
    }

    async deleteCategory(id: string): Promise<CategoryDAO> {
        return await this.infrastructureService.deleteCategory(id);
    }

    async restoreCategory(id: string): Promise<CategoryDAO> {
        return await this.infrastructureService.restoreCategory(id);
    }
}
