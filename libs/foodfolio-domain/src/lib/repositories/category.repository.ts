import { Repository } from '@toxictoast/azkaban-base-domain';
import { CategoryAnemic } from '../anemics';
import { Chainable, Nullable } from '@toxictoast/azkaban-base-types';

interface CategoryAdditions {
    findByParentId(parentId: Nullable<string>): Promise<Array<CategoryAnemic>>;
}

export type CategoryRepository = Chainable<
    CategoryAdditions,
    Repository<CategoryAnemic>
>;
