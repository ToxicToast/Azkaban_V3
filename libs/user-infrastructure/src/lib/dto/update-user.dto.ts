import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

export interface UpdateUserDTO {
  email?: Optional<string>;
  username?: Optional<string>;
  password?: Optional<string>;
  activation_token?: Optional<string>;
  activated_at?: Optional<Nullable<Date>>;
  banned_at?: Optional<Nullable<Date>>;
}
