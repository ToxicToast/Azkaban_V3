import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {
    categoryProvider,
    datasourceProvider,
} from '@azkaban/foodfolio-infrastructure';

@Module({
    controllers: [CategoryController],
    providers: [...datasourceProvider, ...categoryProvider, CategoryService],
})
export class CategoryModule {}
