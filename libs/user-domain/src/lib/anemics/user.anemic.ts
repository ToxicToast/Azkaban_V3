import { Anemic } from '@toxictoast/azkaban-base-domain';

export interface UserAnemic extends Anemic {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly active: boolean;
  readonly isActive: boolean;
  readonly banned: boolean;
  readonly isBanned: boolean;
}
