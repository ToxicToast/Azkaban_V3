import { Module } from '@nestjs/common';
import { ShoppingListController } from './shoppinglist.controller';
import { ShoppingListService } from './shoppinglist.service';
import {
	datasourceProvider,
	ShoppingListEntity,
	shoppinglistProvider,
} from '@azkaban/foodfolio-infrastructure';

@Module({
	controllers: [ShoppingListController],
	providers: [
		...datasourceProvider([ShoppingListEntity]),
		...shoppinglistProvider,
		ShoppingListService,
	],
})
export class ShoppingListModule {}
