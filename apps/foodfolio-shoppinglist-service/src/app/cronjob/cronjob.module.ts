import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobService } from './cronjob.service';
import {
	datasourceProvider,
	itemProvider,
} from '@azkaban/foodfolio-infrastructure';

@Module({
	imports: [ScheduleModule.forRoot()],
	providers: [...datasourceProvider, ...itemProvider, CronjobService],
})
export class CronjobModule {}
