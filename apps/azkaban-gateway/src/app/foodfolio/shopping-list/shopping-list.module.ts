import { Module } from '@nestjs/common';
import { CachingModule } from '../../core/caching.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';
import { NotifyServiceModule } from '../../core/notifiy-service.module';
import { FoodfolioShoppingListServiceModule } from '../../core/foodfolio-shopping-list-service.module';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		FoodfolioShoppingListServiceModule,
		NotifyServiceModule,
	],
	controllers: [ShoppingListController],
	providers: [AuthGuard, NotifyService, ShoppingListService],
})
export class ShoppingListModule {}
