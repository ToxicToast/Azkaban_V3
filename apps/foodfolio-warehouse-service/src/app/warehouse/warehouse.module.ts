import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import {
	warehouseProvider,
	datasourceProvider,
	WarehouseEntity,
} from '@azkaban/foodfolio-infrastructure';

@Module({
	controllers: [WarehouseController],
	providers: [
		...datasourceProvider([WarehouseEntity]),
		...warehouseProvider,
		WarehouseService,
	],
})
export class WarehouseModule {}
