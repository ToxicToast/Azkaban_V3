import { Mapper } from '@toxictoast/azkaban-base-domain';
import { NotificationDAO } from '../../dao';
import { NotificationEntity } from '../entities';
import { NotificationFactory } from '@azkaban/notification-domain';

export class NotificationMapper
    implements Mapper<NotificationDAO, NotificationEntity>
{
    private readonly domainFactory: NotificationFactory =
        new NotificationFactory();

    toEntity(domain: NotificationDAO): NotificationEntity {
        const {
            id,
            service,
            event,
            payload,
            created_at,
            updated_at,
            deleted_at,
        } = domain;
        const entity = new NotificationEntity();
        entity.id = id;
        entity.service = service;
        entity.event = event;
        entity.payload = payload;
        entity.created_at = created_at;
        entity.updated_at = updated_at;
        entity.deleted_at = deleted_at;
        return entity;
    }

    toDomain(data: NotificationEntity): NotificationDAO {
        const {
            id,
            service,
            event,
            payload,
            created_at,
            updated_at,
            deleted_at,
        } = data;
        const aggregate = this.domainFactory.reconstitute({
            id,
            service,
            event,
            payload,
            created_at,
            updated_at,
            deleted_at,
            isUpdated: !!updated_at,
            isDeleted: !!deleted_at,
        });
        return this.domainFactory.constitute(aggregate);
    }
}
