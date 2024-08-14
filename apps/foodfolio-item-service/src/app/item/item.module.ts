import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import {
	itemProvider,
	datasourceProvider,
	itemDetailProvider,
} from '@azkaban/foodfolio-infrastructure';
import { DetailService } from './detail.service';

@Module({
	controllers: [ItemController],
	providers: [
		...datasourceProvider,
		...itemProvider,
		...itemDetailProvider,
		ItemService,
		DetailService,
	],
})
export class ItemModule {}
