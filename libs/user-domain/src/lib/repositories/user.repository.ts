import { UserAnemic } from '../anemics';
import { Chainable } from '@toxictoast/azkaban-base-types';
import { Repository } from '@toxictoast/azkaban-base-domain';

interface UserAdditions {
  findByEmail(email: string): Promise<UserAnemic>;
  findByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<UserAnemic>;
}

export type UserRepository = Chainable<Repository<UserAnemic>, UserAdditions>;
