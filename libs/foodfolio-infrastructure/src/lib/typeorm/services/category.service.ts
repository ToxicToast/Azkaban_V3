import { CategoryService as DomainService } from '@azkaban/foodfolio-domain';
import { CategoryRepository } from '../repositories';
import { CreateCategoryDTO } from '../../dto';
import { CategoryDAO } from '../../dao';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class CategoryService {
    private readonly domainService: DomainService;

    constructor(private readonly repository: CategoryRepository) {
        this.domainService = new DomainService(repository);
    }

    async getCategoryList(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Array<CategoryDAO>> {
        const result = await this.domainService.getCategories(limit, offset);
        if (result.isSuccess) {
            return result.value;
        } else {
            return [];
        }
    }

    async getCategoryByParentId(
        parent_id: Nullable<string>,
    ): Promise<Array<CategoryDAO>> {
        const result =
            await this.domainService.getCategoryByParentId(parent_id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async getCategoryById(id: string): Promise<CategoryDAO> {
        const result = await this.domainService.getCategoryById(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async createCategory(data: CreateCategoryDTO): Promise<CategoryDAO> {
        const result = await this.domainService.createCategory(data);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async updateParentId(
        id: string,
        parent_id: Nullable<string>,
    ): Promise<CategoryDAO> {
        const result = await this.domainService.updateParentId(id, parent_id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async updateTitle(id: string, title: string): Promise<CategoryDAO> {
        const result = await this.domainService.updateTitle(id, title);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async updateActivatedAt(
        id: string,
        activated_at: Nullable<Date>,
    ): Promise<CategoryDAO> {
        const result = await this.domainService.updateActivatedAt(
            id,
            activated_at,
        );
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async deleteCategory(id: string): Promise<CategoryDAO> {
        const result = await this.domainService.deleteCategory(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async restoreCategory(id: string): Promise<CategoryDAO> {
        const result = await this.domainService.restoreCategory(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }
}
