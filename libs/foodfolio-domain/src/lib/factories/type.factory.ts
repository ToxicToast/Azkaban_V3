import { Factory } from '@toxictoast/azkaban-base-domain';
import { TypeId } from '../valueObjects';
import { TypeAnemic } from '../anemics';
import { TypeData } from '../data';
import { TypeAggregate } from '../aggregates';

export class TypeFactory
    implements Factory<TypeAnemic, TypeAggregate, TypeData>
{
    reconstitute(data: TypeAnemic): TypeAggregate {
        const { id, title, activated_at, created_at, updated_at, deleted_at } =
            data;

        const sizeId = new TypeId(id);

        return new TypeAggregate(
            sizeId.value,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        );
    }

    constitute(data: TypeAggregate): TypeAnemic {
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

        const sizeId = new TypeId(id);

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

    createDomain(data: TypeData): TypeAggregate {
        const { title } = data;

        const sizeId = new TypeId();

        return new TypeAggregate(
            sizeId.value,
            title,
            null,
            new Date(),
            null,
            null,
        );
    }
}
