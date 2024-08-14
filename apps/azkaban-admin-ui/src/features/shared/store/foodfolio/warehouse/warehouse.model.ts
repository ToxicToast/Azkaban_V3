import { FoodFolioWarehouse } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

export interface WarehouseModel {
	data: Array<FoodFolioWarehouse>;
	selectedId: Nullable<string>;
}
