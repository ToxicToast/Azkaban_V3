import { Inject, Injectable } from '@nestjs/common';
import { UserTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { ClientProxy } from '@nestjs/microservices';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserDAO } from '@azkaban/user-infrastructure';

@Injectable()
export class UserService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        @Inject('USERS_SERVICE') private readonly client: ClientProxy,
    ) {}

    async getUsers(limit: number, offset: number): Promise<Array<UserDAO>> {
        const cacheKey = `${UserTopics.LIST}:${limit}:${offset}`;
        const cachedData =
            await this.cacheManager.get<Array<UserDAO>>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const data = await this.client
            .send(UserTopics.LIST, { limit, offset })
            .toPromise();
        await this.cacheManager.set(cacheKey, data);
        return data;
    }

    async getUserById(id: string): Promise<UserDAO> {
        const cacheKey = `${UserTopics.ID}:${id}`;
        const cachedData = await this.cacheManager.get<UserDAO>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const data = await this.client.send(UserTopics.ID, { id }).toPromise();
        await this.cacheManager.set(cacheKey, data);
        return data;
    }

    async createUser(email: string, username: string, password: string) {
        return await this.client
            .send(UserTopics.CREATE, { email, username, password })
            .toPromise();
    }

    async updateUser(
        id: string,
        email?: Optional<string>,
        username?: Optional<string>,
        password?: Optional<string>,
        activation_token?: Optional<string>,
        activated_at?: Optional<Nullable<Date>>,
        banned_at?: Optional<Nullable<Date>>,
    ) {
        return await this.client
            .send(UserTopics.UPDATE, {
                id,
                email,
                username,
                password,
                activation_token,
                activated_at,
                banned_at,
            })
            .toPromise();
    }

    async deleteUser(id: string) {
        return await this.client.send(UserTopics.DELETE, { id }).toPromise();
    }

    async restoreUser(id: string) {
        return await this.client.send(UserTopics.RESTORE, { id }).toPromise();
    }
}
