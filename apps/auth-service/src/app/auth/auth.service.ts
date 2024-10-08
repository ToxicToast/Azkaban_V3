import { Inject, Injectable } from '@nestjs/common';
import {
	AuthRepository,
	AuthService as BaseService,
} from '@azkaban/auth-infrastructure';
import { Repository } from 'typeorm';
import { UserEntity } from '@azkaban/user-infrastructure';
import { NotifyService } from './notify.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	private readonly infrastructureRepository: AuthRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('AUTH_REPOSITORY')
		private readonly authRepository: Repository<UserEntity>,
		private readonly notifyService: NotifyService,
		private readonly jwtService: JwtService,
	) {
		this.infrastructureRepository = new AuthRepository(this.authRepository);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

	async createAuth(email: string, username: string, password: string) {
		return await this.infrastructureService
			.createAuth({
				email,
				username,
				password,
			})
			.then(async (res) => {
				await this.notifyService.onRegister(
					res.id,
					res.username,
					res.email,
				);
				return {
					id: res.id,
					username: res.username,
					email: res.email,
					activation_token: res.activation_token,
				};
			})
			.catch(async (error) => {
				await this.notifyService.onRegisterAttempt(
					email,
					username,
					password,
				);
				throw error;
			});
	}

	async login(username: string, password: string) {
		return await this.infrastructureService
			.login(username, password)
			.then(async (res) => {
				await this.notifyService.onLogin(res.username);
				return {
					id: res.id,
					username: res.username,
					email: res.email,
					groups: res.groups,
					isActive: res.isActive,
					isBanned: res.isBanned,
					activation_token: res.activation_token,
					loggedin_at: res.loggedin_at,
				};
			})
			.then(async (res) => {
				const token = await this.jwtService.signAsync(res);
				const decoded = await this.jwtService.decode(token);

				return {
					user: res,
					token,
					exp: decoded.exp,
				};
			})
			.catch(async (error) => {
				await this.notifyService.onLoginAttempt(username);
				throw error;
			});
	}

	async refresh(id: string) {
		return await this.infrastructureService
			.refresh(id)
			.then(async (res) => {
				await this.notifyService.onRefesh(res.username);
				return {
					id: res.id,
					username: res.username,
					email: res.email,
					groups: res.groups,
					isActive: res.isActive,
					isBanned: res.isBanned,
					activation_token: res.activation_token,
					loggedin_at: res.loggedin_at,
				};
			})
			.then(async (res) => {
				const token = await this.jwtService.signAsync(res);
				const decoded = await this.jwtService.decode(token);
				return {
					user: res,
					token,
					exp: decoded.exp,
				};
			})
			.catch(async (error) => {
				throw error;
			});
	}

	async activateAccount(email: string, token: string) {
		return await this.infrastructureService.activateAccount(email, token);
	}
}
