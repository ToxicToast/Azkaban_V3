import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { authProvider, datasourceProvider } from '@azkaban/auth-infrastructure';

@Module({
  controllers: [AuthController],
  providers: [
    ...datasourceProvider,
    ...authProvider,
    AuthService,
    {
      provide: 'PASSWORD_SALT',
      useFactory: (config: ConfigService) => config.get('PASSWORD_SALT'),
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
