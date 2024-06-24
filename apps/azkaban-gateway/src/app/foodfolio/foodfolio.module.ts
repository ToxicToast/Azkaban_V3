import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';

@Module({
    imports: [CategoryModule, CompanyModule],
})
export class FoodfolioModule {}
