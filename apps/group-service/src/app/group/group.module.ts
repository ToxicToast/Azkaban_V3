import { Module } from '@nestjs/common';
import {
  datasourceProvider,
  groupProvider,
} from '@azkaban/group-infrastructure';

@Module({
  controllers: [],
  providers: [...datasourceProvider, ...groupProvider],
})
export class GroupModule {}
