import { ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	HttpException,
	Logger,
	Post,
	Put,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { AuthDAO, TokenDAO } from '@azkaban/auth-infrastructure';
import { AuthGuard } from '../../guards';
import { Response } from 'express';

@ApiTags('auth')
@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@Post('register')
	async register(
		@Body('email') email: string,
		@Body('username') username: string,
		@Body('password') password: string,
	): Promise<AuthDAO> {
		try {
			return await this.service.register(email, username, password);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Post('login')
	async login(
		@Body('username') username: string,
		@Body('password') password: string,
	): Promise<TokenDAO> {
		try {
			return await this.service.login(username, password);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Post('login/cookie')
	async loginWithCookie(
		@Body('username') username: string,
		@Body('password') password: string,
		@Res({ passthrough: true }) response,
	): Promise<TokenDAO> {
		try {
			const auth = await this.service.login(username, password);
			this.setCookie(response, auth.token);
			return auth;
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@UseGuards(AuthGuard)
	@Post('refresh')
	async refreshToken(@Req() request, @Res({ passthrough: true }) response) {
		try {
			const user = request['user'];
			return user;
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Put('activate')
	async activateAccount(
		@Body('email') email: string,
		@Body('token') token: string,
	) {
		try {
			return await this.service.activateAccount(email, token);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@UseGuards(AuthGuard)
	@Put('deactivate')
	async deactivateAccount(@Req() req) {
		try {
			return await this.service.deactivateAccount(req.user.id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@UseGuards(AuthGuard)
	@Delete('delete')
	async deleteAccount(@Req() req) {
		try {
			return await this.service.deleteAccount(req.user.id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	private setCookie(response: Response, token: string): void {
		const expireDate = new Date();
		expireDate.setHours(expireDate.getHours() + 1);
		response.cookie('__azkaban', token, {
			httpOnly: true,
			maxAge: expireDate.getTime(),
			sameSite: 'strict',
			secure: true,
		});
	}
}
