import { Factory } from '@toxictoast/azkaban-base-domain';
import { UserGroupAnemic } from '../anemics';
import { UserGroupAggregate } from '../aggregates';
import { UserGroupData } from '../data';
import { UserId } from '../valueObjects';

export class UserGroupFactory
  implements Factory<UserGroupAnemic, UserGroupAggregate, UserGroupData>
{
  reconstitute(data: UserGroupAnemic): UserGroupAggregate {
    const { id, group_id } = data;

    return new UserGroupAggregate(id, group_id);
  }

  constitute(data: UserGroupAggregate): UserGroupAnemic {
    const { id, group_id } = data.toAnemic();

    return {
      id,
      group_id,
    };
  }

  createDomain(data: UserGroupData): UserGroupAggregate {
    const { group_id } = data;
    const Id = new UserId();
    return new UserGroupAggregate(Id.value, group_id);
  }
}
