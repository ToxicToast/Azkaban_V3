import { Nullable } from '@toxictoast/azkaban-base-types';

export interface CategoryDAO {
    id: string;
    parent_id: Nullable<string>;
    title: string;
    activated_at: Nullable<Date>;
    isActive: boolean;
    isParent: boolean;
    isChild: boolean;
    created_at: Date;
    updated_at: Nullable<Date>;
    deleted_at: Nullable<Date>;
    isUpdated: boolean;
    isDeleted: boolean;
}
