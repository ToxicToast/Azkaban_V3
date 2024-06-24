import { Domain } from '@toxictoast/azkaban-base-domain';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { CompanyAnemic } from '../anemics';

export class CompanyAggregate implements Domain<CompanyAnemic> {
    constructor(
        private readonly id: string,
        private title: string,
        private activated_at: Nullable<Date>,
        private readonly created_at: Date,
        private updated_at: Nullable<Date>,
        private deleted_at: Nullable<Date>,
    ) {}

    isActive(): boolean {
        return !!this.activated_at;
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

    toAnemic(): CompanyAnemic {
        return {
            id: this.id,
            title: this.title,
            activated_at: this.activated_at,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
            isActive: this.isActive(),
            isUpdated: this.isUpdated(),
            isDeleted: this.isDeleted(),
        };
    }

    changeTitle(title: string): void {
        if (title !== this.title) {
            this.title = title;
            this.updated_at = new Date();
        }
    }

    changeActivatedAt(activated_at: Nullable<Date>): void {
        if (activated_at !== this.activated_at) {
            this.activated_at = activated_at;
            this.updated_at = new Date();
        }
    }
}
