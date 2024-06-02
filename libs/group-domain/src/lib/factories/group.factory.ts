import { Factory } from '@toxictoast/azkaban-base-domain';
import { GroupAnemic } from '../anemics';
import { GroupAggregate } from '../aggregates';
import { GroupData } from '../data';

export class GroupFactory
  implements Factory<GroupAnemic, GroupAggregate, GroupData>
{
  reconstitute(data: GroupAnemic): GroupAggregate {
    const { id, title, slug, active, created_at, updated_at, deleted_at } =
      data;

    return new GroupAggregate(
      id,
      title,
      slug,
      active,
      created_at,
      updated_at,
      deleted_at,
    );
  }

  constitute(data: GroupAggregate): GroupAnemic {
    const {
      id,
      title,
      slug,
      active,
      created_at,
      updated_at,
      deleted_at,
      isActive,
      isUpdated,
      isDeleted,
    } = data.toAnemic();
    return {
      id,
      title,
      slug,
      active,
      created_at,
      updated_at,
      deleted_at,
      isActive,
      isUpdated,
      isDeleted,
    };
  }

  createDomain(data: GroupData): GroupAggregate {
    const { title } = data;
    return new GroupAggregate(
      null,
      title,
      null,
      false,
      new Date(),
      new Date(),
      null,
    );
  }
}
