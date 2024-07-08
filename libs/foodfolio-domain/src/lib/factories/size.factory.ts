import { Factory } from '@toxictoast/azkaban-base-domain';
import { SizeId } from '../valueObjects';
import { SizeAnemic } from '../anemics';
import { SizeData } from '../data';
import { SizeAggregate } from '../aggregates';

export class SizeFactory
    implements Factory<SizeAnemic, SizeAggregate, SizeData>
{
    reconstitute(data: SizeAnemic): SizeAggregate {
        const { id, title, activated_at, created_at, updated_at, deleted_at } =
            data;

        const sizeId = new SizeId(id);

        return new SizeAggregate(
            sizeId.value,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        );
    }

    constitute(data: SizeAggregate): SizeAnemic {
        const {
            id,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            isActive,
            isUpdated,
            isDeleted,
        } = data.toAnemic();

        const sizeId = new SizeId(id);

        return {
            id: sizeId.value,
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

    createDomain(data: SizeData): SizeAggregate {
        const { title } = data;

        const sizeId = new SizeId();

        return new SizeAggregate(
            sizeId.value,
            title,
            null,
            new Date(),
            null,
            null,
        );
    }
}
