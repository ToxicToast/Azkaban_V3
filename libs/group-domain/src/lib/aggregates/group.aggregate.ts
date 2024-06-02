import { Domain } from '@toxictoast/azkaban-base-domain';
import { GroupAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class GroupAggregate implements Domain<GroupAnemic> {
  constructor(
    private readonly id: string,
    private title: string,
    private slug: string,
    private active: boolean,
    private readonly created_at: Date,
    private updated_at: Nullable<Date>,
    private deleted_at: Nullable<Date>,
  ) {}

  isActive(): boolean {
    return this.active && !this.isDeleted();
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

  toAnemic(): GroupAnemic {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      active: this.active,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
      isActive: this.isActive(),
      isUpdated: this.isUpdated(),
      isDeleted: this.isDeleted(),
    };
  }

  updateTitle(title: string): void {
    if (this.title !== title) {
      this.updated_at = new Date();
      this.title = title;
    }
  }

  updateSlug(slug: string): void {
    if (this.slug !== slug) {
      this.updated_at = new Date();
      this.slug = slug;
    }
  }

  updateActive(active: boolean): void {
    if (this.active !== active) {
      this.updated_at = new Date();
      this.active = active;
    }
  }
}
