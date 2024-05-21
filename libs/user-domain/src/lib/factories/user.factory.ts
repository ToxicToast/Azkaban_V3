import { Factory } from '@toxictoast/azkaban-base-domain';
import { UserAnemic } from '../anemics';
import { UserAggregate } from '../aggregates';
import { UserData } from '../data';
import { UserId } from '../valueObjects';

export class UserFactory
  implements Factory<UserAnemic, UserAggregate, UserData>
{
  reconstitute(data: UserAnemic): UserAggregate {
    const {
      id,
      username,
      email,
      password,
      active,
      created_at,
      updated_at,
      deleted_at,
    } = data;

    const userId = new UserId(id);

    return new UserAggregate(
      userId.value,
      username,
      password,
      email,
      active,
      created_at,
      updated_at,
      deleted_at
    );
  }

  constitute(data: UserAggregate): UserAnemic {
    const {
      id,
      username,
      password,
      email,
      active,
      created_at,
      updated_at,
      deleted_at,
      isActive,
      isUpdated,
      isDeleted,
    } = data.toAnemic();

    const userId = new UserId(id);

    return {
      id: userId.value,
      username,
      email,
      password,
      active,
      created_at,
      updated_at,
      deleted_at,
      isActive,
      isUpdated,
      isDeleted,
    };
  }

  createDomain(data: UserData): UserAggregate {
    const { username, password, email, active } = data;
    const userId = new UserId();
    return new UserAggregate(
      userId.value,
      username,
      password,
      email,
      active ?? false,
      new Date(),
      null,
      null
    );
  }
}
