import { Factory } from '@toxictoast/azkaban-base-domain';
import { ViewerAnemic } from '../anemics';
import { ViewerAggregate } from '../aggregates';
import { ViewerData } from '../data';
import { ViewerId } from '../valueObjects';

export class ViewerFactory
	implements Factory<ViewerAnemic, ViewerAggregate, ViewerData>
{
	reconstitute(data: ViewerAnemic): ViewerAggregate {
		const {
			id,
			user_id,
			display_name,
			lastseen_at,
			joins,
			parts,
			messages,
			timeouts,
			bans,
			minutes_watched,
			created_at,
			updated_at,
			deleted_at,
		} = data;

		return new ViewerAggregate(
			id,
			user_id,
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
		);
	}

	constitute(data: ViewerAggregate): ViewerAnemic {
		const {
			id,
			user_id,
			display_name,
			lastseen_at,
			joins,
			parts,
			messages,
			timeouts,
			bans,
			minutes_watched,
			created_at,
			updated_at,
			deleted_at,
			isUpdated,
			isDeleted,
		} = data.toAnemic();

		return {
			id,
			user_id,
			display_name,
			lastseen_at,
			joins,
			parts,
			messages,
			timeouts,
			bans,
			minutes_watched,
			created_at,
			updated_at,
			deleted_at,
			isUpdated,
			isDeleted,
		};
	}

	createDomain(data: ViewerData): ViewerAggregate {
		const { display_name } = data;
		const viewerId = new ViewerId();
		return new ViewerAggregate(
			viewerId.value,
			null,
			display_name,
			0,
			0,
			0,
			0,
			0,
			0,
			new Date(),
			new Date(),
			null,
			null,
		);
	}
}
