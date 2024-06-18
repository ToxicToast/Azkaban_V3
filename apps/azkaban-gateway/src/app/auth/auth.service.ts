import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthDAO, TokenDAO } from '@azkaban/auth-infrastructure';

@Injectable()
export class AuthService {
    constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

    async register(
        email: string,
        username: string,
        password: string,
    ): Promise<AuthDAO> {
        return await this.client
            .send(AuthTopics.REGISTER, { email, username, password })
            .toPromise();
    }

    async login(username: string, password: string): Promise<TokenDAO> {
        return await this.client
            .send(AuthTopics.LOGIN, { username, password })
            .toPromise();
    }

    async activateAccount(email: string, token: string): Promise<void> {
        return await this.client
            .send(AuthTopics.ACTIVATE, { email, token })
            .toPromise();
    }

    async deactivateAccount(id: string): Promise<void> {
        return await this.client
            .send(AuthTopics.DEACTIVATE, { id })
            .toPromise();
    }

    async deleteAccount(id: string): Promise<void> {
        return await this.client.send(AuthTopics.DELETE, { id }).toPromise();
    }
}
