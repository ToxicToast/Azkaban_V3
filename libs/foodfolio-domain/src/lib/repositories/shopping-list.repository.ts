import { ShoppingListAnemic } from '../anemics';
import { Chainable } from '@toxictoast/azkaban-base-types';
import { Repository } from '@toxictoast/azkaban-base-domain';

interface ShoppingListAdditions {
	findByItemId(item_id: string): Promise<Array<ShoppingListAnemic>>;
}

export type ShoppingListRepository = Chainable<
	ShoppingListAdditions,
	Repository<ShoppingListAnemic>
>;
