import { Nullable } from '@toxictoast/azkaban-base-types';

export interface NotificationDAO {
    id: string;
    service: string;
    event: string;
    payload: unknown;
    created_at: Date;
    updated_at: Nullable<Date>;
    deleted_at: Nullable<Date>;
    isUpdated: boolean;
    isDeleted: boolean;
}
