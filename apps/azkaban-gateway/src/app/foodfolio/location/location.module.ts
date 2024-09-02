import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { CachingModule } from '../../core/caching.module';
import { NotifyServiceModule } from '../../core/notifiy-service.module';
import { FoodfolioLocationServiceModule } from '../../core/foodfolio-location-service.module';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		FoodfolioLocationServiceModule,
		NotifyServiceModule,
	],
	controllers: [LocationController],
	providers: [AuthGuard, NotifyService, LocationService],
})
export class LocationModule {}
