import { Nullable } from '@toxictoast/azkaban-base-types';

export interface UserDAO {
  id: string;
  username: string;
  email: string;
  password: string;
  active: boolean;
  banned_at: Nullable<Date>;
  created_at: Date;
  updated_at: Nullable<Date>;
  deleted_at: Nullable<Date>;
  isActive: boolean;
  isBanned: boolean;
  isUpdated: boolean;
  isDeleted: boolean;
}
