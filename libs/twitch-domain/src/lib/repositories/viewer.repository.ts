import { ViewerAnemic } from '../anemics';
import { Repository } from '@toxictoast/azkaban-base-domain';
import { Chainable, Nullable } from '@toxictoast/azkaban-base-types';

interface ViewerAdditions {
	findByUserId(user_id: Nullable<string>): Promise<Array<ViewerAnemic>>;
	findByDisplayName(display_name: string): Promise<ViewerAnemic>;
}

export type ViewerRepository = Chainable<
	ViewerAdditions,
	Repository<ViewerAnemic>
>;
