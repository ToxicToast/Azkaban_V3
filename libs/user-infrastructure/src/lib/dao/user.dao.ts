import { Nullable } from '@toxictoast/azkaban-base-types';
import { UserGroupsDAO } from './usergroups.dao';

export interface UserDAO {
	id: string;
	username: string;
	email: string;
	password: string;
	activation_token: Nullable<string>;
	activated_at: Nullable<Date>;
	banned_at: Nullable<Date>;
	loggedin_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
	isActive: boolean;
	isBanned: boolean;
	isUpdated: boolean;
	isDeleted: boolean;
	groups: Array<UserGroupsDAO>;
}
