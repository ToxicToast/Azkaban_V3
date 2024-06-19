import { Nullable } from '@toxictoast/azkaban-base-types';
import { Anemic } from '@toxictoast/azkaban-base-domain';

export interface CategoryAnemic extends Anemic {
    readonly parent_id: Nullable<string>;
    readonly title: string;
    readonly activated_at: Nullable<Date>;
    readonly isActive: boolean;
    readonly isParent: boolean;
    readonly isChild: boolean;
    readonly children: Array<CategoryAnemic>;
}
