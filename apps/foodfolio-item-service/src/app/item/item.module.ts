import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import {
	itemProvider,
	datasourceProvider,
} from '@azkaban/foodfolio-infrastructure';

@Module({
	controllers: [ItemController],
	providers: [...datasourceProvider, ...itemProvider, ItemService],
})
export class ItemModule {}
