import { Factory } from '@toxictoast/azkaban-base-domain';
import { NotificationAnemic } from '../anemics';
import { NotificationAggregate } from '../aggregates';
import { NotificationData } from '../data';
import { NotificationId } from '../valueObjects';

export class NotificationFactory
  implements
    Factory<NotificationAnemic, NotificationAggregate, NotificationData>
{
  reconstitute(anemic: NotificationAnemic): NotificationAggregate {
    const { id, service, event, payload, created_at, updated_at, deleted_at } =
      anemic;

    const notificationId = new NotificationId(id);

    return new NotificationAggregate(
      notificationId.value,
      service,
      event,
      payload,
      created_at,
      updated_at,
      deleted_at
    );
  }

  constitute(domain: NotificationAggregate): NotificationAnemic {
    const {
      id,
      service,
      event,
      payload,
      created_at,
      updated_at,
      deleted_at,
      isUpdated,
      isDeleted,
    } = domain.toAnemic();

    const notificationId = new NotificationId(id);

    return {
      id: notificationId.value,
      service: service,
      event: event,
      payload: payload,
      created_at: created_at,
      updated_at: updated_at,
      deleted_at: deleted_at,
      isUpdated: isUpdated,
      isDeleted: isDeleted,
    };
  }

  createDomain(data: NotificationData): NotificationAggregate {
    const { service, event, payload } = data;
    const notificationId = new NotificationId();
    return new NotificationAggregate(
      notificationId.value,
      service,
      event,
      payload,
      new Date(),
      null,
      null
    );
  }
}
