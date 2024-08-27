import { Repository } from '@toxictoast/azkaban-base-domain';
import { ItemAnemic } from '../anemics';
import { Chainable } from '@toxictoast/azkaban-base-types';

interface ItemAdditions {
	findByTitle(title: string): Promise<ItemAnemic>;
}

export type ItemRepository = Chainable<ItemAdditions, Repository<ItemAnemic>>;
