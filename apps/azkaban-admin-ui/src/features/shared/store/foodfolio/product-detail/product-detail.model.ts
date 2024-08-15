import { FoodFolioItemDetail } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ProductDetailModel {
	data: Array<FoodFolioItemDetail>;
	selectedId: Nullable<string>;
}
