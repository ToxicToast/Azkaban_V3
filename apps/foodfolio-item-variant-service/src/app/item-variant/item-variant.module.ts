import { Module } from '@nestjs/common';
import { ItemVariantController } from './item-variant.controller';
import { ItemVariantService } from './item-variant.service';
import {
	itemVariantProvider,
	datasourceProvider,
	ItemVariantEntity,
} from '@azkaban/foodfolio-infrastructure';

@Module({
	controllers: [ItemVariantController],
	providers: [
		...datasourceProvider([ItemVariantEntity]),
		...itemVariantProvider,
		ItemVariantService,
	],
})
export class ItemVariantModule {}
