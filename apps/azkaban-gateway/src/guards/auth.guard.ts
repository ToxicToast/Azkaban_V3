import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Optional } from '@toxictoast/azkaban-base-types';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	private extractTokenFromCookie(request: Request): Optional<string> {
		const token = request.cookies['__azkaban'];
		return token ?? undefined;
	}

	private checkExpireTime(expireTime: number): void {
		const currentTime = Date.now();
		if (currentTime >= expireTime) {
			throw new UnauthorizedException();
		}
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromCookie(request);
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtService.decode(token);
			this.checkExpireTime(payload.exp * 1000);
			request['user'] = payload;
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}
}
