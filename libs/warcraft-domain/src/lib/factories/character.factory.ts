import { Factory } from '@toxictoast/azkaban-base-domain';
import { CharacterAnemic } from '../anemics';
import { CharacterAggregate } from '../aggregates';
import { CharacterData } from '../data';
import { CharacterId } from '../valueObjects';

export class CharacterFactory
	implements Factory<CharacterAnemic, CharacterAggregate, CharacterData>
{
	reconstitute(data: CharacterAnemic): CharacterAggregate {
		const {
			id,
			user_id,
			region,
			realm,
			name,
			gender,
			faction,
			race,
			character_class,
			active_spec,
			level,
			item_level,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		return new CharacterAggregate(
			id,
			user_id,
			region,
			realm,
			name,
			gender,
			faction,
			race,
			character_class,
			active_spec,
			level,
			item_level,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		);
	}

	constitute(data: CharacterAggregate): CharacterAnemic {
		const {
			id,
			user_id,
			region,
			realm,
			name,
			gender,
			faction,
			race,
			character_class,
			active_spec,
			level,
			item_level,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
			isUpdated,
			isDeleted,
			isActive,
		} = data.toAnemic();
		return {
			id,
			user_id,
			region,
			realm,
			name,
			gender,
			faction,
			race,
			character_class,
			active_spec,
			level,
			item_level,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
			isActive,
			isUpdated,
			isDeleted,
		};
	}

	createDomain(data: CharacterData): CharacterAggregate {
		const { region, realm, name } = data;
		const characterId = new CharacterId();
		return new CharacterAggregate(
			characterId.value,
			null,
			region,
			realm,
			name,
			null,
			null,
			null,
			null,
			null,
			0,
			0,
			null,
			new Date(),
			null,
			null,
		);
	}
}
