import { Nullable } from '@toxictoast/azkaban-base-types';

export interface AuthDAO {
    id: string;
    username: string;
    email: string;
    password: string;
    activation_token: Nullable<string>;
    activated_at: Nullable<Date>;
    banned_at: Nullable<Date>;
    isActive: boolean;
    isBanned: boolean;
    groups: Array<string>;
}

export interface TokenDAO {
    token: string;
    user: AuthDAO;
}
