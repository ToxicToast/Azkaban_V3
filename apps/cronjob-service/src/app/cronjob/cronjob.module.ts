import { Module } from '@nestjs/common';
import { WarcraftModule } from './warcraft/warcraft.module';
import { ViewerModule } from './viewer/viewer.module';

@Module({
	imports: [WarcraftModule, ViewerModule],
})
export class CronjobModule {}
