import { ViewerAnemic } from '../anemics';
import { Repository } from '@toxictoast/azkaban-base-domain';
import { Chainable } from '@toxictoast/azkaban-base-types';

interface ViewerAdditions {
	findByDisplayName(display_name: string): Promise<ViewerAnemic>;
}

export type ViewerRepository = Chainable<
	ViewerAdditions,
	Repository<ViewerAnemic>
>;
