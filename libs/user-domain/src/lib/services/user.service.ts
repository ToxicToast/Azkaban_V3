import { UserAnemic } from '../anemics';
import { UserData } from '../data';
import { UserFactory } from '../factories';
import { UserRepository } from '../repositories';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { UserErrorCodes } from '@toxictoast/azkaban-base-helpers';

export class UserService {
	private readonly factory: UserFactory = new UserFactory();

	constructor(private readonly repository: UserRepository) {}

	private async save(anemic: UserAnemic): Promise<Result<UserAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<UserAnemic>(result);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async getUsers(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Result<Array<UserAnemic>>> {
		try {
			const result = await this.repository.findList(limit, offset);
			return Result.ok<Array<UserAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<UserAnemic>>(error);
		}
	}

	async getUserById(id: string): Promise<Result<UserAnemic>> {
		try {
			const result = await this.repository.findById(id);
			if (result !== null) {
				return Result.ok<UserAnemic>(result);
			}
			return Result.fail<UserAnemic>(UserErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async createUser(data: UserData): Promise<Result<UserAnemic>> {
		try {
			const aggregate = this.factory.createDomain(data);
			return await this.save(aggregate.toAnemic());
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async deleteUser(id: string): Promise<Result<UserAnemic>> {
		try {
			const user = await this.getUserById(id);
			if (user.isSuccess) {
				const userValue = user.value;
				const aggregate = this.factory.reconstitute(userValue);
				aggregate.delete();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(UserErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async restoreUser(id: string): Promise<Result<UserAnemic>> {
		try {
			const user = await this.getUserById(id);
			if (user.isSuccess) {
				const userValue = user.value;
				const aggregate = this.factory.reconstitute(userValue);
				aggregate.restore();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(UserErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async updateUsername(
		id: string,
		username: string,
	): Promise<Result<UserAnemic>> {
		try {
			const user = await this.getUserById(id);
			if (user.isSuccess) {
				const userValue = user.value;
				const aggregate = this.factory.reconstitute(userValue);
				aggregate.changeUsername(username);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(UserErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async updateEmail(id: string, email: string): Promise<Result<UserAnemic>> {
		try {
			const user = await this.getUserById(id);
			if (user.isSuccess) {
				const userValue = user.value;
				const aggregate = this.factory.reconstitute(userValue);
				aggregate.changeEmail(email);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(UserErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async updatePassword(
		id: string,
		password: string,
	): Promise<Result<UserAnemic>> {
		try {
			const user = await this.getUserById(id);
			if (user.isSuccess) {
				const userValue = user.value;
				const aggregate = this.factory.reconstitute(userValue);
				aggregate.changePassword(password);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(UserErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async updateActivationToken(
		id: string,
		activation_token: Nullable<string>,
	): Promise<Result<UserAnemic>> {
		try {
			const user = await this.getUserById(id);
			if (user.isSuccess) {
				const userValue = user.value;
				const aggregate = this.factory.reconstitute(userValue);
				aggregate.changeActivationToken(activation_token);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(UserErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async updateActivatedAt(
		id: string,
		activated_at: Nullable<Date>,
	): Promise<Result<UserAnemic>> {
		try {
			const user = await this.getUserById(id);
			if (user.isSuccess) {
				const userValue = user.value;
				const aggregate = this.factory.reconstitute(userValue);
				aggregate.changeActivatedAt(activated_at);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(UserErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async updateBannedAt(
		id: string,
		banned_at: Nullable<Date>,
	): Promise<Result<UserAnemic>> {
		try {
			const user = await this.getUserById(id);
			if (user.isSuccess) {
				const userValue = user.value;
				const aggregate = this.factory.reconstitute(userValue);
				aggregate.changeBannedAt(banned_at);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(UserErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async updateLoggedInAt(
		id: string,
		loggedin_at: Nullable<Date>,
	): Promise<Result<UserAnemic>> {
		try {
			const user = await this.getUserById(id);
			if (user.isSuccess) {
				const userValue = user.value;
				const aggregate = this.factory.reconstitute(userValue);
				aggregate.changeLoggedInAt(loggedin_at);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(UserErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}
}
