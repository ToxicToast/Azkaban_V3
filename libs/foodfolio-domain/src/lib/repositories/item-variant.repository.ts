import { Repository } from '@toxictoast/azkaban-base-domain';
import { ItemVariantAnemic } from '../anemics';
import { Chainable, Nullable } from '@toxictoast/azkaban-base-types';

interface ItemVariantAdditions {
	findByItemId(itemId: Nullable<string>): Promise<Array<ItemVariantAnemic>>;
	findByCategoryId(
		categoryId: Nullable<string>,
	): Promise<Array<ItemVariantAnemic>>;
	findByLocationId(
		locationId: Nullable<string>,
	): Promise<Array<ItemVariantAnemic>>;
	findByCompanyId(
		companyId: Nullable<string>,
	): Promise<Array<ItemVariantAnemic>>;
	findBySizeId(sizeId: Nullable<string>): Promise<Array<ItemVariantAnemic>>;
	findByTypeId(typeId: Nullable<string>): Promise<Array<ItemVariantAnemic>>;
	findByWarehouseId(
		warehouseId: Nullable<string>,
	): Promise<Array<ItemVariantAnemic>>;
}

export type ItemVariantRepository = Chainable<
	ItemVariantAdditions,
	Repository<ItemVariantAnemic>
>;
