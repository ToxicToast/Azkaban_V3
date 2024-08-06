import { FoodFolioLocation } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface LocationModel {
	data: Array<FoodFolioLocation>;
	selectedId: Nullable<string>;
}
