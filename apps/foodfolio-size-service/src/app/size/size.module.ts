import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import {
	sizeProvider,
	datasourceProvider,
	SizeEntity,
} from '@azkaban/foodfolio-infrastructure';

@Module({
	controllers: [SizeController],
	providers: [
		...datasourceProvider([SizeEntity]),
		...sizeProvider,
		SizeService,
	],
})
export class SizeModule {}
