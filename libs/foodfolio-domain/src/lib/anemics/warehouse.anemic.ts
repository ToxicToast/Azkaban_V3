import { Anemic } from '@toxictoast/azkaban-base-domain';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface WarehouseAnemic extends Anemic {
    readonly title: string;
    readonly activated_at: Nullable<Date>;
    readonly isActive: boolean;
}
