import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { CircuitBreakerModule } from '../circuitbreaker/circuitbreaker.module';

@Module({
  imports: [CircuitBreakerModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
