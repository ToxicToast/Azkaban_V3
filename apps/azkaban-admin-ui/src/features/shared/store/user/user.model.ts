import { User } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface UserModel {
	data: Array<User>;
	selectedId: Nullable<string>;
}
