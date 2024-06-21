import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import {
    companyProvider,
    datasourceProvider,
} from '@azkaban/foodfolio-infrastructure';

@Module({
    controllers: [CompanyController],
    providers: [...datasourceProvider, ...companyProvider, CompanyService],
})
export class CompanyModule {}
