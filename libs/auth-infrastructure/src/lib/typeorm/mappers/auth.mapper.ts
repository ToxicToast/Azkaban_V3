import { Mapper } from '@toxictoast/azkaban-base-domain';
import { AuthEntity } from '../entities';
import { AuthFactory } from '@azkaban/auth-domain';
import { AuthDAO } from '../../dao';

export class AuthMapper implements Mapper<AuthDAO, AuthEntity> {
  private readonly domainFactory: AuthFactory = new AuthFactory();

  toEntity(domain: AuthDAO): AuthEntity {
    const {
      id,
      username,
      email,
      password,
      activation_token,
      activated_at,
      banned_at,
    } = domain;
    const entity = new AuthEntity();
    entity.id = id;
    entity.username = username;
    entity.email = email;
    entity.password = password;
    entity.activation_token = activation_token;
    entity.activated_at = activated_at;
    entity.banned_at = banned_at;
    return entity;
  }

  toDomain(data: AuthEntity): AuthDAO {
    const {
      id,
      username,
      email,
      password,
      activation_token,
      activated_at,
      banned_at,
    } = data;
    const aggregate = this.domainFactory.reconstitute({
      id,
      username,
      email,
      password,
      activation_token,
      activated_at,
      banned_at,
      isBanned: !!banned_at,
      isActive: !!activated_at,
    });
    return this.domainFactory.constitute(aggregate);
  }
}
