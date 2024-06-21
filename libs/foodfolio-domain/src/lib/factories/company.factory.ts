import { Factory } from '@toxictoast/azkaban-base-domain';
import { CompanyAnemic } from '../anemics';
import { CompanyAggregate } from '../aggregates';
import { CompanyData } from '../data';
import { CompanyId } from '@azkaban/foodfolio-domain';

export class CompanyFactory
    implements Factory<CompanyAnemic, CompanyAggregate, CompanyData>
{
    reconstitute(data: CompanyAnemic): CompanyAggregate {
        const { id, title, activated_at, created_at, updated_at, deleted_at } =
            data;

        const companyId = new CompanyId(id);

        return new CompanyAggregate(
            companyId.value,
            title,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        );
    }

    constitute(data: CompanyAggregate): CompanyAnemic {
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

        const companyId = new CompanyId(id);

        return {
            id: companyId.value,
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

    createDomain(data: CompanyData): CompanyAggregate {
        const { title } = data;
        const companyId = new CompanyId();
        return new CompanyAggregate(
            companyId.value,
            title,
            null,
            new Date(),
            null,
            null,
        );
    }
}
