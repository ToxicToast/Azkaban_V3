import { Module } from '@nestjs/common';
import {
	viewerProvider,
	datasourceProvider,
	ViewerEntity,
} from '@azkaban/twitch-infrastructure';
import { ViewerService } from './viewer.service';
import { ViewerController } from './viewer.controller';

@Module({
	controllers: [ViewerController],
	providers: [
		...datasourceProvider([ViewerEntity]),
		...viewerProvider,
		ViewerService,
	],
})
export class ViewerModule {}
