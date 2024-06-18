import { Domain } from '@toxictoast/azkaban-base-domain';
import { NotificationAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class NotificationAggregate implements Domain<NotificationAnemic> {
    constructor(
        private readonly id: string,
        private readonly service: string,
        private readonly event: string,
        private readonly payload: unknown,
        private readonly created_at: Date,
        private updated_at: Nullable<Date>,
        private deleted_at: Nullable<Date>,
    ) {}

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

    toAnemic(): NotificationAnemic {
        return {
            id: this.id,
            service: this.service,
            event: this.event,
            payload: this.payload,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
            isUpdated: this.isUpdated(),
            isDeleted: this.isDeleted(),
        };
    }
}
