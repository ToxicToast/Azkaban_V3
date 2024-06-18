import { Anemic } from '@toxictoast/azkaban-base-domain';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { UserGroupAnemic } from './usergroup.anemic';

export interface UserAnemic extends Anemic {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly isActive: boolean;
    readonly banned_at: Nullable<Date>;
    readonly isBanned: boolean;
    readonly activated_at: Nullable<Date>;
    readonly activation_token: Nullable<string>;
    readonly groups: Array<UserGroupAnemic>;
}
