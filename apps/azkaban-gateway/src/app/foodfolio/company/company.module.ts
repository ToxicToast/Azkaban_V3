import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CachingModule } from '../../core/caching.module';
import { NotifyServiceModule } from '../../core/notifiy-service.module';
import { FoodfolioCompanyServiceModule } from '../../core/foodfolio-company-service.module';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		FoodfolioCompanyServiceModule,
		NotifyServiceModule,
	],
	controllers: [CompanyController],
	providers: [AuthGuard, NotifyService, CompanyService],
})
export class CompanyModule {}
