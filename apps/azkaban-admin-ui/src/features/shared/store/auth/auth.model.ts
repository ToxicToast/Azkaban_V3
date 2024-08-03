import { Nullable } from '@toxictoast/azkaban-base-types';

export interface AuthModel {
	id: Nullable<string>;
	username: Nullable<string>;
	groups: Array<string>;
	token: Nullable<string>;
	isActive: Nullable<boolean>;
	isBanned: Nullable<boolean>;
	activation_token: Nullable<string>;
	isAuthenticated: boolean;
	expireTime: Nullable<number>;
}
