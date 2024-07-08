import { Mapper } from '@toxictoast/azkaban-base-domain';
import { SizeFactory } from '@azkaban/foodfolio-domain';
import { SizeDAO } from '../../dao';
import { SizeEntity } from '../entities';

export class SizeMapper implements Mapper<SizeDAO, SizeEntity> {
    private readonly domainFactory: SizeFactory = new SizeFactory();

    toEntity(data: SizeDAO): SizeEntity {
        const { id, title, activated_at, created_at, updated_at, deleted_at } =
            data;
        const entity = new SizeEntity();
        entity.id = id;
        entity.title = title;
        entity.activated_at = activated_at;
        entity.created_at = created_at;
        entity.updated_at = updated_at;
        entity.deleted_at = deleted_at;
        return entity;
    }

    toDomain(data: SizeEntity): SizeDAO {
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
