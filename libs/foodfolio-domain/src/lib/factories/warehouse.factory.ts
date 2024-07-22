import { Factory } from '@toxictoast/azkaban-base-domain';
import { WarehouseAnemic } from '../anemics';
import { WarehouseAggregate } from '../aggregates';
import { WarehouseData } from '../data';
import { WarehouseId } from '../valueObjects';

export class WarehouseFactory
    implements Factory<WarehouseAnemic, WarehouseAggregate, WarehouseData>
{
    reconstitute(data: WarehouseAnemic): WarehouseAggregate {
        const { id, title, activated_at, created_at, updated_at, deleted_at } =
            data;

        const warehouseId = new WarehouseId(id);

        return new WarehouseAggregate(
            warehouseId.value,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        );
    }

    constitute(data: WarehouseAggregate): WarehouseAnemic {
        const {
            id,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            isActive,
            isDeleted,
            isUpdated,
        } = data.toAnemic();

        const warehouseId = new WarehouseId(id);

        return {
            id: warehouseId.value,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            isActive,
            isUpdated,
            isDeleted,
        };
    }

    createDomain(data: WarehouseData): WarehouseAggregate {
        const { title } = data;
        const warehouseId = new WarehouseId();
        return new WarehouseAggregate(
            warehouseId.value,
            title,
            null,
            new Date(),
            null,
            null,
        );
    }
}
