import { GroupAnemic } from '../anemics';
import { Repository } from '@toxictoast/azkaban-base-domain';
import { Chainable } from '@toxictoast/azkaban-base-types';

interface GroupAdditions {
	findByTitle(title: string): Promise<GroupAnemic>;
}

export type GroupRepository = Chainable<
	GroupAdditions,
	Repository<GroupAnemic>
>;
