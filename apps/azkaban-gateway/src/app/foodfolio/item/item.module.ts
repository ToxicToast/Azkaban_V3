import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { CachingModule } from '../../core/caching.module';
import { NotifyServiceModule } from '../../core/notifiy-service.module';
import { FoodfolioItemServiceModule } from '../../core/foodfolio-item-service.module';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		FoodfolioItemServiceModule,
		NotifyServiceModule,
	],
	controllers: [ItemController],
	providers: [AuthGuard, NotifyService, ItemService],
})
export class ItemModule {}
