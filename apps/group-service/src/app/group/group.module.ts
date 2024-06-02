import { Module } from '@nestjs/common';
import {
  datasourceProvider,
  groupProvider,
} from '@azkaban/group-infrastructure';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';

@Module({
  controllers: [GroupController],
  providers: [...datasourceProvider, ...groupProvider, GroupService],
})
export class GroupModule {}
