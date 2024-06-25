import { Domain } from '@toxictoast/azkaban-base-domain';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { LocationAnemic } from '../anemics';

export class LocationAggregate implements Domain<LocationAnemic> {
    constructor(
        private readonly id: string,
        private parent_id: Nullable<string>,
        private title: string,
        private freezer: boolean,
        private activated_at: Nullable<Date>,
        private readonly created_at: Date,
        private updated_at: Nullable<Date>,
        private deleted_at: Nullable<Date>,
    ) {}

    isFreezer(): boolean {
        return this.freezer;
    }

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

    toAnemic(): LocationAnemic {
        return {
            id: this.id,
            parent_id: this.parent_id,
            title: this.title,
            freezer: this.freezer,
            activated_at: this.activated_at,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
            isFreezer: this.isFreezer(),
            isActive: this.isActive(),
            isParent: this.isParent(),
            isChild: this.isChild(),
            isUpdated: this.isUpdated(),
            isDeleted: this.isDeleted(),
        };
    }

    changeParentId(parent_id: Nullable<string>): void {
        if (parent_id !== this.parent_id) {
            this.parent_id = parent_id;
        }
    }

    changeTitle(title: string): void {
        if (title !== this.title) {
            this.title = title;
        }
    }

    changeActivatedAt(activated_at: Nullable<Date>): void {
        if (activated_at !== this.activated_at) {
            this.updated_at = new Date();
            this.activated_at = activated_at;
        }
    }

    changeFreezer(freezer: boolean): void {
        if (freezer !== this.freezer) {
            this.updated_at = new Date();
            this.freezer = freezer;
        }
    }
}
