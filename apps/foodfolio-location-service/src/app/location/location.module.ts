import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import {
	locationProvider,
	datasourceProvider,
	LocationEntity,
} from '@azkaban/foodfolio-infrastructure';

@Module({
	controllers: [LocationController],
	providers: [
		...datasourceProvider([LocationEntity]),
		...locationProvider,
		LocationService,
	],
})
export class LocationModule {}
