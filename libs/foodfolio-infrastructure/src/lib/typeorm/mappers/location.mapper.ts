import { Mapper } from '@toxictoast/azkaban-base-domain';
import { LocationFactory } from '@azkaban/foodfolio-domain';
import { LocationDAO } from '../../dao';
import { LocationEntity } from '../entities';

export class LocationMapper implements Mapper<LocationDAO, LocationEntity> {
    private readonly domainFactory: LocationFactory = new LocationFactory();

    toEntity(data: LocationDAO): LocationEntity {
        const {
            id,
            parent_id,
            title,
            freezer,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        } = data;
        const entity = new LocationEntity();
        entity.id = id;
        entity.parent_id = parent_id;
        entity.title = title;
        entity.freezer = freezer;
        entity.activated_at = activated_at;
        entity.created_at = created_at;
        entity.updated_at = updated_at;
        entity.deleted_at = deleted_at;
        return entity;
    }

    toDomain(data: LocationEntity): LocationDAO {
        const {
            id,
            parent_id,
            title,
            freezer,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        } = data;
        const aggregate = this.domainFactory.reconstitute({
            id,
            parent_id,
            title,
            freezer,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            isActive: !!activated_at,
            isUpdated: !!updated_at,
            isDeleted: !!deleted_at,
            isParent: parent_id === null,
            isChild: parent_id !== null,
            isFreezer: freezer,
        });
        return this.domainFactory.constitute(aggregate);
    }
}
