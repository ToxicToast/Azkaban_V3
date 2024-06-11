import { AuthAnemic } from '../anemics';
import { AuthFactory } from '../factories';
import { AuthRepository } from '../repositories';
import { Result } from '@toxictoast/azkaban-base-domain';
import { AuthData } from '../data';
import {
    AuthErrorCodes,
    UserErrorCodes,
} from '@toxictoast/azkaban-base-helpers';

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

    async createUser(data: AuthData): Promise<Result<AuthAnemic>> {
        try {
            const checkEmail = await this.repository.findByEmail(data.email);
            const checkUsername = await this.repository.findByUsername(
                data.username,
            );
            if (checkEmail !== null) {
                return Result.fail<AuthAnemic>(AuthErrorCodes.EMAIL_FOUND);
            }
            if (checkUsername !== null) {
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
            const checkUsername =
                await this.repository.findByUsername(username);
            if (checkUsername === null) {
                return Result.fail<AuthAnemic>(UserErrorCodes.NOT_FOUND);
            }
            if (checkUsername.password !== password) {
                return Result.fail<AuthAnemic>('Invalid password'); // TODO: Create Error Code
            }
            if (checkUsername.isBanned) {
                return Result.fail<AuthAnemic>(UserErrorCodes.IS_BANNED);
            }
            if (!checkUsername.isActive) {
                return Result.fail<AuthAnemic>(UserErrorCodes.NOT_ACTIVE);
            }
            return Result.ok<AuthAnemic>(checkUsername);
        } catch (error) {
            return Result.fail<AuthAnemic>(error);
        }
    }

    async activateUser(
        email: string,
        token: string,
    ): Promise<Result<AuthAnemic>> {
        try {
            const result = await this.repository.findByEmail(email);
            if (result !== null) {
                if (result.isActive) {
                    return Result.fail<AuthAnemic>('User is already active'); // TODO: Create Error Code
                }
                if (result.activation_token !== token) {
                    return Result.fail<AuthAnemic>('Token does not match'); // TODO: Create Error Code
                }
                const aggregate = this.factory.reconstitute(result);
                aggregate.updateActivation();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<AuthAnemic>(UserErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<AuthAnemic>(error);
        }
    }
}
