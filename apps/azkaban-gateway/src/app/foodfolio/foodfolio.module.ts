import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { LocationModule } from './location/location.module';
import { SizeModule } from './size/size.module';
import { TypeModule } from './type/type.module';
import { ItemModule } from './item/item.module';
import { ItemDetailModule } from './item-detail/item-detail.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ItemVariantModule } from './item-variant/item-variant.module';

@Module({
	imports: [
		CategoryModule,
		CompanyModule,
		LocationModule,
		SizeModule,
		TypeModule,
		ItemModule,
		ItemDetailModule,
		WarehouseModule,
		ItemVariantModule,
	],
})
export class FoodfolioModule {}
