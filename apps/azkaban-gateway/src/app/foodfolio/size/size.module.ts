import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { CachingModule } from '../../core/caching.module';
import { NotifyServiceModule } from '../../core/notifiy-service.module';
import { FoodfolioSizeServiceModule } from '../../core/foodfolio-size-service.module';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		FoodfolioSizeServiceModule,
		NotifyServiceModule,
	],
	controllers: [SizeController],
	providers: [AuthGuard, NotifyService, SizeService],
})
export class SizeModule {}
