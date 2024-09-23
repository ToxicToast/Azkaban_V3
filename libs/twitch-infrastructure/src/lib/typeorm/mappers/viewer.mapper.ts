import { Mapper } from '@toxictoast/azkaban-base-domain';
import { ViewerFactory } from '@azkaban/twitch-domain';
import { ViewerDAO } from '../../dao';
import { ViewerEntity } from '../entities';

export class ViewerMapper implements Mapper<ViewerDAO, ViewerEntity> {
	private readonly domainFactory: ViewerFactory = new ViewerFactory();

	toEntity(data: ViewerDAO): ViewerEntity {
		const {
			id,
			display_name,
			joins,
			parts,
			messages,
			timeouts,
			bans,
			minutes_watched,
			lastseen_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const entity = new ViewerEntity();
		entity.id = id;
		entity.display_name = display_name;
		entity.joins = joins;
		entity.parts = parts;
		entity.messages = messages;
		entity.timeouts = timeouts;
		entity.bans = bans;
		entity.minutes_watched = minutes_watched;
		entity.lastseen_at = lastseen_at;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		return entity;
	}

	toDomain(data: ViewerEntity): ViewerDAO {
		const {
			id,
			display_name,
			joins,
			parts,
			messages,
			timeouts,
			bans,
			minutes_watched,
			lastseen_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const aggregate = this.domainFactory.reconstitute({
			id,
			display_name,
			joins,
			parts,
			messages,
			timeouts,
			bans,
			minutes_watched,
			lastseen_at,
			created_at,
			updated_at,
			deleted_at,
			isUpdated: !!updated_at,
			isDeleted: !!deleted_at,
		});
		return this.domainFactory.constitute(aggregate);
	}
}
