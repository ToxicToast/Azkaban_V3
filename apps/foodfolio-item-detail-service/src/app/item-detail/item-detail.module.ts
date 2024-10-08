import { Module } from '@nestjs/common';
import { ItemDetailController } from './item-detail.controller';
import { ItemDetailService } from './item-detail.service';
import {
	itemDetailProvider,
	datasourceProvider,
	ItemDetailEntity,
} from '@azkaban/foodfolio-infrastructure';

@Module({
	controllers: [ItemDetailController],
	providers: [
		...datasourceProvider([ItemDetailEntity]),
		...itemDetailProvider,
		ItemDetailService,
	],
})
export class ItemDetailModule {}
