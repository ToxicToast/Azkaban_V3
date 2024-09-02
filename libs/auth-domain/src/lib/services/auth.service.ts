import { AuthAnemic } from '../anemics';
import { AuthFactory } from '../factories';
import { AuthRepository } from '../repositories';
import { Result } from '@toxictoast/azkaban-base-domain';
import { AuthData } from '../data';
import {
	AuthErrorCodes,
	UserErrorCodes,
} from '@toxictoast/azkaban-base-helpers';
import { Logger } from '@nestjs/common';

export class AuthService {
	private readonly factory: AuthFactory = new AuthFactory();

	constructor(private readonly repository: AuthRepository) {}

	private async save(anemic: AuthAnemic): Promise<Result<AuthAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<AuthAnemic>(result);
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}

	async findByEmail(email: string): Promise<Result<AuthAnemic>> {
		try {
			const result = await this.repository.findByEmail(email);
			return Result.ok<AuthAnemic>(result);
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}

	async findByUsername(username: string): Promise<Result<AuthAnemic>> {
		try {
			const result = await this.repository.findByUsername(username);
			return Result.ok<AuthAnemic>(result);
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}

	async findById(id: string): Promise<Result<AuthAnemic>> {
		try {
			const result = await this.repository.findById(id);
			return Result.ok<AuthAnemic>(result);
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}

	async createUser(data: AuthData): Promise<Result<AuthAnemic>> {
		try {
			const checkEmail = await this.findByEmail(data.email);
			if (checkEmail.value !== null) {
				return Result.fail<AuthAnemic>(AuthErrorCodes.EMAIL_FOUND);
			}
			const checkUsername = await this.findByUsername(data.username);
			if (checkUsername.value !== null) {
				return Result.fail<AuthAnemic>(AuthErrorCodes.USERNAME_FOUND);
			}
			const aggregate = this.factory.createDomain(data);
			return await this.save(aggregate.toAnemic());
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}

	async login(
		username: string,
		password: string,
	): Promise<Result<AuthAnemic>> {
		try {
			const checkUsername = await this.findByUsername(username);
			if (checkUsername.value === null) {
				return Result.fail<AuthAnemic>(UserErrorCodes.NOT_FOUND);
			}
			if (checkUsername.value.password !== password) {
				return Result.fail<AuthAnemic>(AuthErrorCodes.INVALID_PASSWORD);
			}
			if (checkUsername.value.isBanned) {
				return Result.fail<AuthAnemic>(UserErrorCodes.IS_BANNED);
			}
			if (!checkUsername.value.isActive) {
				return Result.fail<AuthAnemic>(UserErrorCodes.NOT_ACTIVE);
			}
			const aggregate = this.factory.reconstitute(checkUsername.value);
			aggregate.updateLogin();
			await this.save(aggregate.toAnemic());
			return Result.ok<AuthAnemic>(checkUsername.value);
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}

	async activateUser(
		email: string,
		token: string,
	): Promise<Result<AuthAnemic>> {
		try {
			const result = await this.findByEmail(email);
			if (result.isSuccess) {
				if (result.value.isActive) {
					return Result.fail<AuthAnemic>(AuthErrorCodes.IS_ACTIVE);
				}
				if (result.value.activation_token !== token) {
					return Result.fail<AuthAnemic>(
						AuthErrorCodes.TOKEN_UNMATCH,
					);
				}
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.updateActivation();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<AuthAnemic>(UserErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}
}
