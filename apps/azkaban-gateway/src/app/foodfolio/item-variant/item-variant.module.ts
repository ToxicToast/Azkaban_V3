import { Module } from '@nestjs/common';
import { CachingModule } from '../../core/caching.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { ItemVariantController } from './item-variant.controller';
import { ItemVariantService } from './item-variant.service';
import { NotifyServiceModule } from '../../core/notifiy-service.module';
import { FoodfolioItemVariantServiceModule } from '../../core/foodfolio-item-variant-service.module';
import { FoodfolioItemDetailServiceModule } from '../../core/foodfolio-item-detail-service.module';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		FoodfolioItemVariantServiceModule,
		FoodfolioItemDetailServiceModule,
		NotifyServiceModule,
	],
	controllers: [ItemVariantController],
	providers: [AuthGuard, NotifyService, ItemVariantService],
})
export class ItemVariantModule {}
