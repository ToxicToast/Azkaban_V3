import { FoodFolioType } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface TypeModel {
	data: Array<FoodFolioType>;
	selectedId: Nullable<string>;
}
