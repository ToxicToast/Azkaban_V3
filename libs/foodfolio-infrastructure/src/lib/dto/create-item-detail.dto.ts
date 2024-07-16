import { Nullable } from '@toxictoast/azkaban-base-types';

export interface CreateItemDetailDTO {
    item_id: string;
    purchase_date: Date;
    expiration_date: Nullable<Date>;
    returnable: boolean;
}
