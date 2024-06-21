import { Nullable } from '@toxictoast/azkaban-base-types';

export interface CreateCategoryDTO {
    title: string;
    parent_id: Nullable<string>;
}
