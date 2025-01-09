import { Mapper } from '@toxictoast/azkaban-base-domain';
import { CharacterFactory } from '@azkaban/warcraft-domain';
import { CharacterDAO } from '../../dao';
import { CharacterEntity } from '../entities';

export class CharacterMapper implements Mapper<CharacterDAO, CharacterEntity> {
	private readonly domainFactory: CharacterFactory = new CharacterFactory();

	toEntity(domain: CharacterDAO): CharacterEntity {
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
			guild,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = domain;
		const entity = new CharacterEntity();
		entity.id = id;
		entity.user_id = user_id;
		entity.region = region;
		entity.realm = realm;
		entity.name = name;
		entity.gender = gender;
		entity.faction = faction;
		entity.race = race;
		entity.character_class = character_class;
		entity.active_spec = active_spec;
		entity.level = level;
		entity.item_level = item_level;
		entity.guild = guild;
		entity.activated_at = activated_at;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		return entity;
	}

	toDomain(entity: CharacterEntity): CharacterDAO {
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
			guild,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = entity;
		const aggregate = this.domainFactory.reconstitute({
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
			guild,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
			isActive: !!activated_at,
			isUpdated: !!updated_at,
			isDeleted: !!deleted_at,
		});
		return this.domainFactory.constitute(aggregate);
	}
}
