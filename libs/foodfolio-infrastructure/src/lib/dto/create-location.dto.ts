import { Nullable } from '@toxictoast/azkaban-base-types';

export interface CreateLocationDTO {
    title: string;
    parent_id: Nullable<string>;
    freezer: boolean;
}
