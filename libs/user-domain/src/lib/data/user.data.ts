import { Optional } from '@toxictoast/azkaban-base-types';

export interface UserData {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly active?: Optional<boolean>;
}
