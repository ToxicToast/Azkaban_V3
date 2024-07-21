import { Mapper } from '@toxictoast/azkaban-base-domain';
import { WarehouseFactory } from '@azkaban/foodfolio-domain';
import { WarehouseDAO } from '../../dao';
import { WarehouseEntity } from '../entities';

export class WarehouseMapper implements Mapper<WarehouseDAO, WarehouseEntity> {
    private readonly domainFactory: WarehouseFactory = new WarehouseFactory();

    toEntity(data: WarehouseDAO): WarehouseEntity {
        const { id, title, activated_at, created_at, updated_at, deleted_at } =
            data;
        const entity = new WarehouseEntity();
        entity.id = id;
        entity.title = title;
        entity.activated_at = activated_at;
        entity.created_at = created_at;
        entity.updated_at = updated_at;
        entity.deleted_at = deleted_at;
        return entity;
    }

    toDomain(data: WarehouseEntity): WarehouseDAO {
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
