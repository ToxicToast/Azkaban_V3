import { Factory } from '@toxictoast/azkaban-base-domain';
import { CategoryAnemic } from '../anemics';
import { CategoryAggregate } from '../aggregates';
import { CategoryData } from '../data';
import { CategoryId } from '../valueObjects';

export class CategoryFactory
    implements Factory<CategoryAnemic, CategoryAggregate, CategoryData>
{
    reconstitute(data: CategoryAnemic): CategoryAggregate {
        const {
            id,
            parent_id,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            children,
        } = data;

        const categoryId = new CategoryId(id);
        const parentId = new CategoryId(parent_id);

        return new CategoryAggregate(
            categoryId.value,
            parentId.value,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            children,
        );
    }

    constitute(data: CategoryAggregate): CategoryAnemic {
        const {
            id,
            parent_id,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            children,
            isActive,
            isParent,
            isChild,
            isUpdated,
            isDeleted,
        } = data.toAnemic();

        const categoryId = new CategoryId(id);
        const parentId = new CategoryId(parent_id);

        return {
            id: categoryId.value,
            parent_id: parentId.value,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            children,
            isActive,
            isParent,
            isChild,
            isUpdated,
            isDeleted,
        };
    }

    createDomain(data: CategoryData): CategoryAggregate {
        const { title, parent_id } = data;
        const categoryId = new CategoryId();
        const parentId = new CategoryId(parent_id);
        return new CategoryAggregate(
            categoryId.value,
            parentId.value,
            title,
            null,
            new Date(),
            null,
            null,
            [],
        );
    }
}
