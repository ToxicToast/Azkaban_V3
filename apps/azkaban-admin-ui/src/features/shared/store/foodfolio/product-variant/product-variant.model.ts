import { FoodFolioItemVariant } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ProductVariantModel {
	data: Array<FoodFolioItemVariant>;
	selectedId: Nullable<string>;
}
