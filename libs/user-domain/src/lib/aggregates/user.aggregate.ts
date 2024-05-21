import { Domain } from '@toxictoast/azkaban-base-domain';
import { UserAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class UserAggregate implements Domain<UserAnemic> {
  constructor(
    private readonly id: string,
    private username: string,
    private password: string,
    private email: string,
    private active: boolean,
    private banned_at: Nullable<Date>,
    private readonly created_at: Date,
    private updated_at: Nullable<Date>,
    private deleted_at: Nullable<Date>
  ) {}

  isActive(): boolean {
    return this.active;
  }

  isBanned(): boolean {
    return !!this.banned_at;
  }

  isUpdated(): boolean {
    return !!this.updated_at;
  }

  isDeleted(): boolean {
    return !!this.deleted_at;
  }

  delete(): void {
    this.deleted_at = new Date();
  }

  restore(): void {
    this.deleted_at = null;
  }

  toAnemic(): UserAnemic {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      active: this.active,
      banned_at: this.banned_at,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
      isActive: this.isActive(),
      isBanned: this.isBanned(),
      isUpdated: this.isUpdated(),
      isDeleted: this.isDeleted(),
    };
  }

  changeUsername(username: string): void {
    if (this.username !== username) {
      this.updated_at = new Date();
      this.username = username;
    }
  }

  changeEmail(email: string): void {
    if (this.email !== email) {
      this.updated_at = new Date();
      this.email = email;
    }
  }

  changePassword(password: string): void {
    this.updated_at = new Date();
    this.password = password;
  }

  changeStatus(active: boolean): void {
    this.updated_at = new Date();
    this.active = active;
  }

  changeBan(ban: Nullable<Date>): void {
    this.updated_at = new Date();
    this.banned_at = ban;
  }
}
