import { Module } from '@nestjs/common';
import { ItemVariantController } from './item-variant.controller';
import { ItemVariantService } from './item-variant.service';
import {
	itemVariantProvider,
	datasourceProvider,
} from '@azkaban/foodfolio-infrastructure';

@Module({
	controllers: [ItemVariantController],
	providers: [
		...datasourceProvider,
		...itemVariantProvider,
		ItemVariantService,
	],
})
export class ItemVariantModule {}
