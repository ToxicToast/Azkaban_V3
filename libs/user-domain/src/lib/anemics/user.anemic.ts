import { Anemic } from '@toxictoast/azkaban-base-domain';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface UserAnemic extends Anemic {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly active: boolean;
  readonly isActive: boolean;
  readonly banned_at: Nullable<Date>;
  readonly isBanned: boolean;
}
