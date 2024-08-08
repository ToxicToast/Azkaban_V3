import { FoodFolioSize } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface SizeModel {
	data: Array<FoodFolioSize>;
	selectedId: Nullable<string>;
}
