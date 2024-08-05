import { FoodFolioCompany } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface BrandModel {
	data: Array<FoodFolioCompany>;
	selectedId: Nullable<string>;
}
