import { Anemic } from '@toxictoast/azkaban-base-domain';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface LocationAnemic extends Anemic {
    readonly parent_id: Nullable<string>;
    readonly title: string;
    readonly freezer: boolean;
    readonly activated_at: Nullable<Date>;
    readonly isFreezer: boolean;
    readonly isActive: boolean;
    readonly isParent: boolean;
    readonly isChild: boolean;
}
