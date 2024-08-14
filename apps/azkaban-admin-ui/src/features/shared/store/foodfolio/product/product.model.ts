import { FoodFolioItem } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface ProductModel {
	data: Array<FoodFolioItem>;
	selectedId: Nullable<string>;
}
