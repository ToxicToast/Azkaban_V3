import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { CachingModule } from '../../core/caching.module';
import { FoodfolioCategoryServiceModule } from '../../core/foodfolio-category-service.module';
import { NotifyServiceModule } from '../../core/notifiy-service.module';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		FoodfolioCategoryServiceModule,
		NotifyServiceModule,
	],
	controllers: [CategoryController],
	providers: [AuthGuard, NotifyService, CategoryService],
})
export class CategoryModule {}
