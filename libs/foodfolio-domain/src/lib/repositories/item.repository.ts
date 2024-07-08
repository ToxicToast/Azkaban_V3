import { Repository } from '@toxictoast/azkaban-base-domain';
import { ItemAnemic } from '../anemics';
import { Chainable, Nullable } from '@toxictoast/azkaban-base-types';

interface ItemAdditions {
    findByCategoryId(categoryId: Nullable<string>): Promise<Array<ItemAnemic>>;
    findByLocationId(locationId: Nullable<string>): Promise<Array<ItemAnemic>>;
    findByCompanyId(companyId: Nullable<string>): Promise<Array<ItemAnemic>>;
    findBySizeId(sizeId: Nullable<string>): Promise<Array<ItemAnemic>>;
    findByTypeId(typeId: Nullable<string>): Promise<Array<ItemAnemic>>;
    findByWarehouseId(
        warehouseId: Nullable<string>,
    ): Promise<Array<ItemAnemic>>;
}

export type ItemRepository = Chainable<ItemAdditions, Repository<ItemAnemic>>;
