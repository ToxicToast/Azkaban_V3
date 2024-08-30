import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { NotifyService } from './notify.service';
import { AuthGuard } from '../../guards';
import { JwtModule } from '@nestjs/jwt';
import { CachingModule } from '../core/caching.module';
import { NotifyServiceModule } from '../core/notifiy-service.module';
import { GroupsServiceModule } from '../core/groups-service.module';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		GroupsServiceModule,
		NotifyServiceModule,
	],
	controllers: [GroupsController],
	providers: [AuthGuard, GroupsService, NotifyService],
})
export class GroupsModule {}
