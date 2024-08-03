import { FoodFolioCategory } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface CategoryModel {
	data: Array<FoodFolioCategory>;
	selectedId: Nullable<string>;
}
