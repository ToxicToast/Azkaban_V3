import { Mapper } from '@toxictoast/azkaban-base-domain';
import { UserEntity } from '../entities';
import { UserFactory } from '@azkaban/user-domain';
import { UserDAO } from '../../dao';

export class UserMapper implements Mapper<UserDAO, UserEntity> {
  private readonly domainFactory: UserFactory = new UserFactory();

  toEntity(domain: UserDAO): UserEntity {
    const {
      id,
      username,
      email,
      password,
      activation_token,
      activated_at,
      banned_at,
      created_at,
      updated_at,
      deleted_at,
    } = domain;
    const entity = new UserEntity();
    entity.id = id;
    entity.username = username;
    entity.email = email;
    entity.password = password;
    entity.activation_token = activation_token;
    entity.activated_at = activated_at;
    entity.banned_at = banned_at;
    entity.created_at = created_at;
    entity.updated_at = updated_at;
    entity.deleted_at = deleted_at;
    return entity;
  }

  toDomain(data: UserEntity): UserDAO {
    const {
      id,
      username,
      email,
      password,
      activation_token,
      activated_at,
      banned_at,
      created_at,
      updated_at,
      deleted_at,
    } = data;
    const aggregate = this.domainFactory.reconstitute({
      id,
      username,
      email,
      password,
      activation_token,
      activated_at,
      banned_at,
      created_at,
      updated_at,
      deleted_at,
      isBanned: !!banned_at,
      isActive: !!activated_at,
      isUpdated: !!updated_at,
      isDeleted: !!deleted_at,
    });
    return this.domainFactory.constitute(aggregate);
  }
}
