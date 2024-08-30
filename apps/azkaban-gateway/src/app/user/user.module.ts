import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { CachingModule } from '../core/caching.module';
import { UserServiceModule } from '../core/user-service.module';

@Module({
	imports: [CachingModule, JwtModule, UserServiceModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
