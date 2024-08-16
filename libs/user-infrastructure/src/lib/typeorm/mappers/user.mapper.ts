import { Mapper } from '@toxictoast/azkaban-base-domain';
import { UserEntity, UserGroupEntity } from '../entities';
import { UserFactory, UserGroupFactory } from '@azkaban/user-domain';
import { UserDAO } from '../../dao';
import { GroupEntity } from '@azkaban/group-infrastructure';

export class UserMapper implements Mapper<UserDAO, UserEntity> {
	private readonly domainFactory: UserFactory = new UserFactory();
	private readonly domainGroupFactory: UserGroupFactory =
		new UserGroupFactory();

	toEntity(domain: UserDAO): UserEntity {
		const {
			id,
			username,
			email,
			password,
			activation_token,
			activated_at,
			banned_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
			groups,
		} = domain;
		const entity = new UserEntity();
		entity.id = id;
		entity.username = username;
		entity.email = email;
		entity.password = password;
		entity.activation_token = activation_token;
		entity.activated_at = activated_at;
		entity.banned_at = banned_at;
		entity.loggedin_at = loggedin_at;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		entity.groups =
			groups?.map((group) => {
				const groupEntity = new GroupEntity();
				groupEntity.id = group.group_id;
				groupEntity.title = group.title;
				//
				const userGroupEntity = new UserGroupEntity();
				userGroupEntity.id = group.id;
				userGroupEntity.user = entity;
				userGroupEntity.group = groupEntity;
				return userGroupEntity;
			}) ?? [];
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
			groups,
			loggedin_at,
		} = data;

		const groupsAnemicArray =
			groups?.map((group) => {
				const aggregate = this.domainGroupFactory.reconstitute({
					id: group.id,
					group_id: group?.group?.id ?? '',
					user_id: id,
					title: group?.group?.title ?? '',
				});
				return this.domainGroupFactory.constitute(aggregate);
			}) ?? [];

		const aggregate = this.domainFactory.reconstitute({
			id,
			username,
			email,
			password,
			activation_token,
			activated_at,
			banned_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
			isBanned: !!banned_at,
			isActive: !!activated_at,
			isUpdated: !!updated_at,
			isDeleted: !!deleted_at,
			groups: groupsAnemicArray,
		});

		return this.domainFactory.constitute(aggregate);
	}
}
