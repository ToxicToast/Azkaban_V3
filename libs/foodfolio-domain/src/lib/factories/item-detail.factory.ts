import { Factory } from '@toxictoast/azkaban-base-domain';
import { ItemDetailAnemic } from '../anemics';
import { ItemDetailAggregate } from '../aggregates';
import { ItemDetailData } from '../data';
import { ItemDetailId, ItemId } from '../valueObjects';

export class ItemDetailFactory
    implements Factory<ItemDetailAnemic, ItemDetailAggregate, ItemDetailData>
{
    reconstitute(data: ItemDetailAnemic): ItemDetailAggregate {
        const {
            id,
            item_id,
            purchase_date,
            expiration_date,
            opening_date,
            returnable,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        } = data;

        const itemDetailId = new ItemDetailId(id);
        const itemId = new ItemDetailId(item_id);

        return new ItemDetailAggregate(
            itemDetailId.value,
            itemId.value,
            purchase_date,
            expiration_date,
            opening_date,
            returnable,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        );
    }

    constitute(data: ItemDetailAggregate): ItemDetailAnemic {
        const {
            id,
            item_id,
            purchase_date,
            expiration_date,
            opening_date,
            returnable,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            isActive,
            isUpdated,
            isDeleted,
            isOpened,
            isExpired,
        } = data.toAnemic();

        const itemDetailId = new ItemDetailId(id);
        const itemId = new ItemDetailId(item_id);

        return {
            id: itemDetailId.value,
            item_id: itemId.value,
            purchase_date,
            expiration_date,
            opening_date,
            returnable,
            activated_at,
            isActive,
            created_at,
            updated_at,
            deleted_at,
            isUpdated,
            isDeleted,
            isOpened,
            isExpired,
        };
    }

    createDomain(data: ItemDetailData): ItemDetailAggregate {
        const { item_id, purchase_date, expiration_date, returnable } = data;

        const itemDetailId = new ItemDetailId();
        const itemId = new ItemId(item_id);

        return new ItemDetailAggregate(
            itemDetailId.value,
            itemId.value,
            purchase_date,
            expiration_date,
            null,
            returnable,
            null,
            new Date(),
            null,
            null,
        );
    }
}
