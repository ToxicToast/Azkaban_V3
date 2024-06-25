import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import {
    locationProvider,
    datasourceProvider,
} from '@azkaban/foodfolio-infrastructure';

@Module({
    controllers: [LocationController],
    providers: [...datasourceProvider, ...locationProvider, LocationService],
})
export class LocationModule {}
