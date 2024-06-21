import { Mapper } from '@toxictoast/azkaban-base-domain';
import { CompanyFactory } from '@azkaban/foodfolio-domain';
import { CompanyDAO } from '../../dao';
import { CompanyEntity } from '../entities';

export class CompanyMapper implements Mapper<CompanyDAO, CompanyEntity> {
    private readonly domainFactory: CompanyFactory = new CompanyFactory();

    toEntity(data: CompanyDAO): CompanyEntity {
        const { id, title, activated_at, created_at, updated_at, deleted_at } =
            data;
        const entity = new CompanyEntity();
        entity.id = id;
        entity.title = title;
        entity.activated_at = activated_at;
        entity.created_at = created_at;
        entity.updated_at = updated_at;
        entity.deleted_at = deleted_at;
        return entity;
    }

    toDomain(data: CompanyEntity): CompanyDAO {
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
