import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { LocationModule } from './location/location.module';
import { SizeModule } from './size/size.module';
import { TypeModule } from './type/type.module';

@Module({
    imports: [
        CategoryModule,
        CompanyModule,
        LocationModule,
        SizeModule,
        TypeModule,
    ],
})
export class FoodfolioModule {}
