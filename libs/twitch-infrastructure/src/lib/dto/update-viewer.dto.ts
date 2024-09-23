import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

export interface UpdateViewerDTO {
	joins?: Optional<number>;
	parts?: Optional<number>;
	messages?: Optional<number>;
	timeouts?: Optional<number>;
	bans?: Optional<number>;
	minutes_watched?: Optional<number>;
	lastseen_at?: Optional<Nullable<Date>>;
}
