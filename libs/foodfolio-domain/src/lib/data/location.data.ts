import { Nullable } from '@toxictoast/azkaban-base-types';

export interface LocationData {
    readonly title: string;
    readonly parent_id: Nullable<string>;
    readonly freezer: boolean;
}
