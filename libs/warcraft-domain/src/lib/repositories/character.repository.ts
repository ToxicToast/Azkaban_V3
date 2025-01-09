import { Repository } from '@toxictoast/azkaban-base-domain';
import { CharacterAnemic } from '../anemics';
import { Chainable, Nullable } from '@toxictoast/azkaban-base-types';

interface CharacterAdditions {
	findByRegionRealmName(
		region: string,
		realm: string,
		name: string,
	): Promise<CharacterAnemic>;
	findByUserId(user_id: Nullable<string>): Promise<Array<CharacterAnemic>>;
	findByGuild(guild: Nullable<string>): Promise<Array<CharacterAnemic>>;
}

export type CharacterRepository = Chainable<
	CharacterAdditions,
	Repository<CharacterAnemic>
>;
