import { Repository } from '@toxictoast/azkaban-base-domain';
import { WarehouseAnemic } from '../anemics';
import { Chainable } from '@toxictoast/azkaban-base-types';

interface WarehouseAdditions {
	findByTitle(title: string): Promise<WarehouseAnemic>;
}

export type WarehouseRepository = Chainable<
	WarehouseAdditions,
	Repository<WarehouseAnemic>
>;
