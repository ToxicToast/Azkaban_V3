import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import {
	CompanyEntity,
	companyProvider,
	datasourceProvider,
} from '@azkaban/foodfolio-infrastructure';

@Module({
	controllers: [CompanyController],
	providers: [
		...datasourceProvider([CompanyEntity]),
		...companyProvider,
		CompanyService,
	],
})
export class CompanyModule {}
