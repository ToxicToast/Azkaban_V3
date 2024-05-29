import { Mapper } from '@toxictoast/azkaban-base-domain';
import { AuthGroupEntity } from '../entities';
import { AuthGroupFactory } from '@azkaban/auth-domain';
import { AuthGroupDAO } from '../../dao';

export class AuthGroupMapper implements Mapper<AuthGroupDAO, AuthGroupEntity> {
  private readonly domainFactory: AuthGroupFactory = new AuthGroupFactory();

  toEntity(domain: AuthGroupDAO): AuthGroupEntity {
    const { id, group_id, user_id } = domain;
    const entity = new AuthGroupEntity();
    entity.id = id;
    entity.group_id = group_id;
    entity.user_id = user_id;
    return entity;
  }

  toDomain(data: AuthGroupEntity): AuthGroupDAO {
    const { id, group_id, user_id } = data;
    const aggregate = this.domainFactory.reconstitute({
      id,
      group_id,
      user_id,
    });
    return this.domainFactory.constitute(aggregate);
  }
}
