import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { CachingModule } from '../../core/caching.module';
import { NotifyServiceModule } from '../../core/notifiy-service.module';
import { FoodfolioWarehouseServiceModule } from '../../core/foodfolio-warehouse-service.module';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		FoodfolioWarehouseServiceModule,
		NotifyServiceModule,
	],
	controllers: [WarehouseController],
	providers: [AuthGuard, NotifyService, WarehouseService],
})
export class WarehouseModule {}
