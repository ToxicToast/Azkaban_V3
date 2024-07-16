import { Repository } from '@toxictoast/azkaban-base-domain';
import { ItemDetailAnemic } from '../anemics';
import { Chainable, Nullable } from '@toxictoast/azkaban-base-types';

interface ItemDetailAdditions {
    findByItemId(itemId: Nullable<string>): Promise<Array<ItemDetailAnemic>>;
}

export type ItemDetailRepository = Chainable<
    ItemDetailAdditions,
    Repository<ItemDetailAnemic>
>;
