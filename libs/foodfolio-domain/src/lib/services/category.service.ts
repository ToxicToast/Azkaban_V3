import { CategoryAnemic } from '../anemics';
import { CategoryData } from '../data';
import { CategoryFactory } from '../factories';
import { CategoryRepository } from '../repositories';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { FoodFolioCategoryErrorCodes } from '@toxictoast/azkaban-base-helpers';

export class CategoryService {
    private readonly factory: CategoryFactory = new CategoryFactory();

    constructor(private readonly repository: CategoryRepository) {}

    private async save(
        anemic: CategoryAnemic,
    ): Promise<Result<CategoryAnemic>> {
        try {
            const result = await this.repository.save(anemic);
            return Result.ok<CategoryAnemic>(result);
        } catch (error) {
            return Result.fail<CategoryAnemic>(error);
        }
    }

    async getCategories(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Result<Array<CategoryAnemic>>> {
        try {
            const result = await this.repository.findList(limit, offset);
            return Result.ok<Array<CategoryAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<CategoryAnemic>>(error);
        }
    }

    async getCategoryById(id: string): Promise<Result<CategoryAnemic>> {
        try {
            const result = await this.repository.findById(id);
            if (result !== null) {
                return Result.ok<CategoryAnemic>(result);
            }
            return Result.fail<CategoryAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<CategoryAnemic>(error);
        }
    }

    async getCategoryByParentId(
        parent_id: Nullable<string>,
    ): Promise<Result<Array<CategoryAnemic>>> {
        try {
            const result = await this.repository.findByParentId(parent_id);
            if (result !== null) {
                return Result.ok<Array<CategoryAnemic>>(result);
            }
            return Result.fail<Array<CategoryAnemic>>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<Array<CategoryAnemic>>(error);
        }
    }

    async createCategory(data: CategoryData): Promise<Result<CategoryAnemic>> {
        try {
            const aggregate = this.factory.createDomain(data);
            return await this.save(aggregate.toAnemic());
        } catch (error) {
            return Result.fail<CategoryAnemic>(error);
        }
    }

    async deleteCategory(id: string): Promise<Result<CategoryAnemic>> {
        try {
            const category = await this.getCategoryById(id);
            if (category.isSuccess) {
                const categoryValue = category.value;
                const aggregate = this.factory.reconstitute(categoryValue);
                aggregate.delete();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<CategoryAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<CategoryAnemic>(error);
        }
    }

    async restoreCategory(id: string): Promise<Result<CategoryAnemic>> {
        try {
            const category = await this.getCategoryById(id);
            if (category.isSuccess) {
                const categoryValue = category.value;
                const aggregate = this.factory.reconstitute(categoryValue);
                aggregate.restore();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<CategoryAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<CategoryAnemic>(error);
        }
    }

    async updateParentId(
        id: string,
        parent_id: Nullable<string>,
    ): Promise<Result<CategoryAnemic>> {
        try {
            const category = await this.getCategoryById(id);
            if (category.isSuccess) {
                const categoryValue = category.value;
                const aggregate = this.factory.reconstitute(categoryValue);
                aggregate.changeParentId(parent_id);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<CategoryAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<CategoryAnemic>(error);
        }
    }

    async updateTitle(
        id: string,
        title: string,
    ): Promise<Result<CategoryAnemic>> {
        try {
            const category = await this.getCategoryById(id);
            if (category.isSuccess) {
                const categoryValue = category.value;
                const aggregate = this.factory.reconstitute(categoryValue);
                aggregate.changeTitle(title);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<CategoryAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<CategoryAnemic>(error);
        }
    }

    async updateActivatedAt(
        id: string,
        activated_at: Nullable<Date>,
    ): Promise<Result<CategoryAnemic>> {
        try {
            const category = await this.getCategoryById(id);
            if (category.isSuccess) {
                const categoryValue = category.value;
                const aggregate = this.factory.reconstitute(categoryValue);
                aggregate.changeActivatedAt(activated_at);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<CategoryAnemic>(
                FoodFolioCategoryErrorCodes.NOT_FOUND,
            );
        } catch (error) {
            return Result.fail<CategoryAnemic>(error);
        }
    }
}
