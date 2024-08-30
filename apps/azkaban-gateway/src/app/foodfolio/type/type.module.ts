import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { CachingModule } from '../../core/caching.module';
import { NotifyServiceModule } from '../../core/notifiy-service.module';
import { FoodfolioTypeServiceModule } from '../../core/foodfolio-type-service.module';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		FoodfolioTypeServiceModule,
		NotifyServiceModule,
	],
	controllers: [TypeController],
	providers: [AuthGuard, NotifyService, TypeService],
})
export class TypeModule {}
