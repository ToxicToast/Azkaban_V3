import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../guards';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [JwtModule],
	controllers: [AuthController],
	providers: [AuthGuard, AuthService],
})
export class AuthModule {}
