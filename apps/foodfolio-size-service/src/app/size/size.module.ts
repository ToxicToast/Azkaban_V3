import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import {
    sizeProvider,
    datasourceProvider,
} from '@azkaban/foodfolio-infrastructure';

@Module({
    controllers: [SizeController],
    providers: [...datasourceProvider, ...sizeProvider, SizeService],
})
export class SizeModule {}
