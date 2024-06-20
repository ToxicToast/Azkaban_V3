import { Nullable } from '@toxictoast/azkaban-base-types';

export interface CategoryData {
    readonly title: string;
    readonly parent_id: Nullable<string>;
}
