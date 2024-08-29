import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import {
	typeProvider,
	datasourceProvider,
	TypeEntity,
} from '@azkaban/foodfolio-infrastructure';

@Module({
	controllers: [TypeController],
	providers: [
		...datasourceProvider([TypeEntity]),
		...typeProvider,
		TypeService,
	],
})
export class TypeModule {}
