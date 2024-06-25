import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { LocationModule } from './location/location.module';

@Module({
    imports: [CategoryModule, CompanyModule, LocationModule],
})
export class FoodfolioModule {}
