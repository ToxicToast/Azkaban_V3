import { AuthService as DomainService } from '@azkaban/auth-domain';
import { AuthRepository } from '../repositories';
import { CreateAuthDTO } from '../../dto';
import { AuthDAO } from '../../dao';
import { BadRequestException } from '@nestjs/common';
import { HashPasswordHelper } from '@toxictoast/azkaban-base-helpers';

export class AuthService {
    private readonly domainService: DomainService;

    constructor(private readonly repository: AuthRepository) {
        this.domainService = new DomainService(repository);
    }

    async createAuth(data: CreateAuthDTO): Promise<AuthDAO> {
        const result = await this.domainService.createUser(data);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async login(username: string, password: string): Promise<AuthDAO> {
        const hashedPassword = HashPasswordHelper(password);
        const result = await this.domainService.login(username, hashedPassword);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async activateAccount(email: string, token: string): Promise<AuthDAO> {
        const result = await this.domainService.activateUser(email, token);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }
}
