import { Mapper } from '@toxictoast/azkaban-base-domain';
import { GroupDAO } from '../../dao';
import { GroupEntity } from '../entities';
import { GroupFactory } from '@azkaban/group-domain';

export class GroupMapper implements Mapper<GroupDAO, GroupEntity> {
    private readonly domainFactory: GroupFactory = new GroupFactory();

    toEntity(data: GroupDAO): GroupEntity {
        const { id, title, slug, active, created_at, updated_at, deleted_at } =
            data;
        const entity = new GroupEntity();
        entity.id = id;
        entity.title = title;
        entity.slug = slug;
        entity.active = active;
        entity.created_at = created_at;
        entity.updated_at = updated_at;
        entity.deleted_at = deleted_at;
        return entity;
    }

    toDomain(data: GroupEntity): GroupDAO {
        const { id, title, slug, active, created_at, updated_at, deleted_at } =
            data;
        const aggregate = this.domainFactory.reconstitute({
            id,
            title,
            slug,
            active,
            created_at,
            updated_at,
            deleted_at,
            isActive: active && !!deleted_at,
            isUpdated: !!updated_at,
            isDeleted: !!deleted_at,
        });
        return this.domainFactory.constitute(aggregate);
    }
}
