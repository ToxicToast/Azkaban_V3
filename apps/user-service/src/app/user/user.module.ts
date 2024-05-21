import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { datasourceProvider, userProvider } from '@azkaban/user-infrastructure';

@Module({
  controllers: [UserController],
  providers: [...datasourceProvider, ...userProvider, UserService],
})
export class UserModule {}
