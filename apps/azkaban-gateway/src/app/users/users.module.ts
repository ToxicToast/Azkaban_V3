import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CircuitBreakerModule } from '../circuitbreaker/circuitbreaker.module';

@Module({
    imports: [CircuitBreakerModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
