import { Repository } from '@toxictoast/azkaban-base-domain';
import { TypeAnemic } from '../anemics';
import { Chainable } from '@toxictoast/azkaban-base-types';

interface TypeAdditions {
	findByTitle(title: string): Promise<TypeAnemic>;
}

export type TypeRepository = Chainable<TypeAdditions, Repository<TypeAnemic>>;
