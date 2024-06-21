import { Mapper } from '@toxictoast/azkaban-base-domain';
import { CategoryFactory } from '@azkaban/foodfolio-domain';
import { CategoryDAO } from '../../dao';
import { CategoryEntity } from '../entities';

export class CategoryMapper implements Mapper<CategoryDAO, CategoryEntity> {
    private readonly domainFactory: CategoryFactory = new CategoryFactory();

    toEntity(data: CategoryDAO): CategoryEntity {
        const {
            id,
            parent_id,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        } = data;
        const entity = new CategoryEntity();
        entity.id = id;
        entity.parent_id = parent_id;
        entity.title = title;
        entity.activated_at = activated_at;
        entity.created_at = created_at;
        entity.updated_at = updated_at;
        entity.deleted_at = deleted_at;
        return entity;
    }

    toDomain(data: CategoryEntity): CategoryDAO {
        const {
            id,
            parent_id,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        } = data;
        const aggregate = this.domainFactory.reconstitute({
            id,
            parent_id,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            isActive: !!activated_at,
            isUpdated: !!updated_at,
            isDeleted: !!deleted_at,
            isParent: parent_id === null,
            isChild: parent_id !== null,
        });
        return this.domainFactory.constitute(aggregate);
    }
}
