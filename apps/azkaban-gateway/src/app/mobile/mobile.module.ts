import { Module } from '@nestjs/common';
import { CachingModule } from '../core/caching.module';
import { MobileService } from './mobile.service';
import { MobileController } from './mobile.controller';
import { FoodfolioItemServiceModule } from '../core/foodfolio-item-service.module';
import { FoodfolioItemVariantServiceModule } from '../core/foodfolio-item-variant-service.module';

@Module({
	imports: [
		CachingModule,
		FoodfolioItemServiceModule,
		FoodfolioItemVariantServiceModule,
	],
	controllers: [MobileController],
	providers: [MobileService],
})
export class MobileModule {}
