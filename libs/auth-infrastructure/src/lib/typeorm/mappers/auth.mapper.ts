import { Mapper } from '@toxictoast/azkaban-base-domain';
import { AuthFactory } from '@azkaban/auth-domain';
import { AuthDAO } from '../../dao';
import { UserEntity } from '@azkaban/user-infrastructure';

export class AuthMapper implements Mapper<AuthDAO, UserEntity> {
    private readonly domainFactory: AuthFactory = new AuthFactory();

    toEntity(domain: AuthDAO): UserEntity {
        const {
            id,
            username,
            email,
            password,
            activation_token,
            activated_at,
            banned_at,
        } = domain;
        const entity = new UserEntity();
        entity.id = id;
        entity.username = username;
        entity.email = email;
        entity.password = password;
        entity.activation_token = activation_token;
        entity.activated_at = activated_at;
        entity.banned_at = banned_at;
        return entity;
    }

    toDomain(data: UserEntity): AuthDAO {
        const {
            id,
            username,
            email,
            password,
            activation_token,
            activated_at,
            banned_at,
            groups,
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
            groups: groups?.map((group) => group.group.title) ?? [],
        });
        return this.domainFactory.constitute(aggregate);
    }
}
