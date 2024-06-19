import { Inject, Injectable } from '@nestjs/common';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import {
    UserDAO,
    UserEntity,
    UserRepository,
    UserService as BaseService,
} from '@azkaban/user-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    private readonly infrastructureRepository: UserRepository;
    private readonly infrastructureService: BaseService;

    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<UserEntity>,
    ) {
        this.infrastructureRepository = new UserRepository(this.userRepository);
        this.infrastructureService = new BaseService(
            this.infrastructureRepository,
        );
    }

    async getUsers(limit: number, offset: number): Promise<Array<UserDAO>> {
        return await this.infrastructureService.getUserList(limit, offset);
    }

    async getUserById(id: string): Promise<UserDAO> {
        return await this.infrastructureService.getUserById(id);
    }

    async createUser(
        email: string,
        username: string,
        password: string,
    ): Promise<UserDAO> {
        return await this.infrastructureService.createUser({
            email,
            username,
            password,
        });
    }

    async updateUser(
        id: string,
        email?: Optional<string>,
        username?: Optional<string>,
        password?: Optional<string>,
        activation_token?: Optional<string>,
        activated_at?: Optional<Nullable<Date>>,
        banned_at?: Optional<Nullable<Date>>,
    ): Promise<UserDAO> {
        if (email !== undefined) {
            await this.infrastructureService.updateEmail(id, email);
        }
        if (username !== undefined) {
            await this.infrastructureService.updateUsername(id, username);
        }
        if (password !== undefined) {
            await this.infrastructureService.updatePassword(id, password);
        }
        if (activation_token !== undefined) {
            await this.infrastructureService.updateActivationToken(
                id,
                activation_token,
            );
        }
        if (activated_at !== undefined) {
            await this.infrastructureService.updateActivatedAt(
                id,
                activated_at,
            );
        }
        if (banned_at !== undefined) {
            await this.infrastructureService.updateBannedAt(id, banned_at);
        }
        return await this.infrastructureService.getUserById(id);
    }

    async deleteUser(id: string): Promise<UserDAO> {
        return await this.infrastructureService.deleteUser(id);
    }

    async restoreUser(id: string): Promise<UserDAO> {
        return await this.infrastructureService.restoreUser(id);
    }
}
