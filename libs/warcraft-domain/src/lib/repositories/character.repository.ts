import { Repository } from '@toxictoast/azkaban-base-domain';
import { CharacterAnemic } from '../anemics';
import { Chainable } from '@toxictoast/azkaban-base-types';

interface CharacterAdditions {
	findByRegionRealmName(
		region: string,
		realm: string,
		name: string,
	): Promise<CharacterAnemic>;
}

export type CharacterRepository = Chainable<
	CharacterAdditions,
	Repository<CharacterAnemic>
>;
