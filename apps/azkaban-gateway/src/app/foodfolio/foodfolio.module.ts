import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { NotifyService } from './notify.service';

@Module({
    imports: [CategoryModule],
    providers: [NotifyService],
})
export class FoodfolioModule {}
