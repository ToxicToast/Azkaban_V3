import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../guards';
import { JwtModule } from '@nestjs/jwt';
import { AuthServiceModule } from '../core/auth-service.module';

@Module({
	imports: [JwtModule, AuthServiceModule],
	controllers: [AuthController],
	providers: [AuthGuard, AuthService],
})
export class AuthModule {}
