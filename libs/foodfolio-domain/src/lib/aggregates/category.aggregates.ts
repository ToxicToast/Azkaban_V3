import { Domain } from '@toxictoast/azkaban-base-domain';
import { CategoryAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class CategoryAggregates implements Domain<CategoryAnemic> {
    constructor(
        private readonly id: string,
        private parent_id: Nullable<string>,
        private title: string,
        private activated_at: Nullable<Date>,
        private readonly created_at: Date,
        private updated_at: Nullable<Date>,
        private deleted_at: Nullable<Date>,
        private children: Array<CategoryAnemic>,
    ) {}

    isActive(): boolean {
        return !!this.activated_at;
    }

    isParent(): boolean {
        return this.parent_id === null;
    }

    isChild(): boolean {
        return this.parent_id !== null;
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

    toAnemic(): CategoryAnemic {
        return {
            id: this.id,
            parent_id: this.parent_id,
            title: this.title,
            activated_at: this.activated_at,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
            isActive: this.isActive(),
            isParent: this.isParent(),
            isChild: this.isChild(),
            children: this.children,
            isUpdated: this.isUpdated(),
            isDeleted: this.isDeleted(),
        };
    }

    changeParentId(parent_id: Nullable<string>): void {
        if (parent_id !== this.parent_id) {
            this.parent_id = parent_id;
        }
    }
}
