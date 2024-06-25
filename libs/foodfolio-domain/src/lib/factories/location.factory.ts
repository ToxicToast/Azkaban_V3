import { Factory } from '@toxictoast/azkaban-base-domain';
import { LocationAnemic } from '../anemics';
import { LocationAggregate } from '../aggregates';
import { LocationData } from '../data';
import { LocationParentId, LocationId } from '../valueObjects';

export class LocationFactory
    implements Factory<LocationAnemic, LocationAggregate, LocationData>
{
    reconstitute(data: LocationAnemic): LocationAggregate {
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

        const locationId = new LocationId(id);
        const parentId = new LocationParentId(parent_id);

        return new LocationAggregate(
            locationId.value,
            parentId.value,
            title,
            freezer,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        );
    }

    constitute(data: LocationAggregate): LocationAnemic {
        const {
            id,
            parent_id,
            title,
            freezer,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            isFreezer,
            isActive,
            isParent,
            isChild,
            isUpdated,
            isDeleted,
        } = data.toAnemic();

        const locationId = new LocationId(id);
        const parentId = new LocationParentId(parent_id);

        return {
            id: locationId.value,
            parent_id: parentId.value,
            title,
            freezer,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            isFreezer,
            isActive,
            isParent,
            isChild,
            isUpdated,
            isDeleted,
        };
    }

    createDomain(data: LocationData): LocationAggregate {
        const { title, parent_id, freezer } = data;

        const locationId = new LocationId();
        const parentId = new LocationParentId(parent_id);

        return new LocationAggregate(
            locationId.value,
            parentId.value,
            title,
            freezer,
            null,
            new Date(),
            null,
            null,
        );
    }
}
