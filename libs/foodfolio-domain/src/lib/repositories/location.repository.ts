import { Repository } from '@toxictoast/azkaban-base-domain';
import { LocationAnemic } from '../anemics';
import { Chainable, Nullable } from '@toxictoast/azkaban-base-types';

interface LocationAdditions {
	findByParentId(parentId: Nullable<string>): Promise<Array<LocationAnemic>>;
	findByFreezer(freezer: boolean): Promise<Array<LocationAnemic>>;
	findByTitle(title: string): Promise<LocationAnemic>;
}

export type LocationRepository = Chainable<
	LocationAdditions,
	Repository<LocationAnemic>
>;
