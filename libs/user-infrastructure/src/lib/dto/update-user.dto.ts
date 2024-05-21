import { Optional } from '@toxictoast/azkaban-base-types';

export interface UpdateUserDTO {
  email?: Optional<string>;
  username?: Optional<string>;
  password?: Optional<string>;
}
