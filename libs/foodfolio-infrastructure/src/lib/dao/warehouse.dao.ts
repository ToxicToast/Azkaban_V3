import { Nullable } from '@toxictoast/azkaban-base-types';

export interface WarehouseDAO {
    id: string;
    title: string;
    activated_at: Nullable<Date>;
    isActive: boolean;
    created_at: Date;
    updated_at: Nullable<Date>;
    deleted_at: Nullable<Date>;
    isUpdated: boolean;
    isDeleted: boolean;
}
