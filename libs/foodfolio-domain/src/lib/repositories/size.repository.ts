import { Repository } from '@toxictoast/azkaban-base-domain';
import { SizeAnemic } from '../anemics';
import { Chainable } from '@toxictoast/azkaban-base-types';

interface SizeAdditions {
	findByTitle(title: string): Promise<SizeAnemic>;
}

export type SizeRepository = Chainable<SizeAdditions, Repository<SizeAnemic>>;
