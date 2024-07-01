import { Mapper } from '@toxictoast/azkaban-base-domain';
import { TypeFactory } from '@azkaban/foodfolio-domain';
import { TypeDAO } from '../../dao';
import { TypeEntity } from '../entities';

export class TypeMapper implements Mapper<TypeDAO, TypeEntity> {
    private readonly domainFactory: TypeFactory = new TypeFactory();

    toEntity(data: TypeDAO): TypeEntity {
        const { id, title, activated_at, created_at, updated_at, deleted_at } =
            data;
        const entity = new TypeEntity();
        entity.id = id;
        entity.title = title;
        entity.activated_at = activated_at;
        entity.created_at = created_at;
        entity.updated_at = updated_at;
        entity.deleted_at = deleted_at;
        return entity;
    }

    toDomain(data: TypeEntity): TypeDAO {
        const { id, title, activated_at, created_at, updated_at, deleted_at } =
            data;
        const aggregate = this.domainFactory.reconstitute({
            id,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            isActive: !!activated_at,
            isUpdated: !!updated_at,
            isDeleted: !!deleted_at,
        });
        return this.domainFactory.constitute(aggregate);
    }
}
