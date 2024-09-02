import { Module } from '@nestjs/common';
import { CachingModule } from '../../core/caching.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { ItemDetailController } from './item-detail.controller';
import { ItemDetailService } from './item-detail.service';
import { NotifyServiceModule } from '../../core/notifiy-service.module';
import { FoodfolioItemDetailServiceModule } from '../../core/foodfolio-item-detail-service.module';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		FoodfolioItemDetailServiceModule,
		NotifyServiceModule,
	],
	controllers: [ItemDetailController],
	providers: [AuthGuard, NotifyService, ItemDetailService],
})
export class ItemDetailModule {}
