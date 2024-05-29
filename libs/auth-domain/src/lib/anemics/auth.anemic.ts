import { Nullable } from '@toxictoast/azkaban-base-types';

export interface AuthAnemic {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly isActive: boolean;
  readonly banned_at: Nullable<Date>;
  readonly isBanned: boolean;
  readonly activated_at: Nullable<Date>;
  readonly activation_token: Nullable<string>;
  readonly groups: Array<string>;
}
