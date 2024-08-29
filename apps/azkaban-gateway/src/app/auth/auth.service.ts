import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	AuthTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { AuthDAO, TokenDAO } from '@azkaban/auth-infrastructure';

@Injectable()
export class AuthService {
	constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

	async register(
		email: string,
		username: string,
		password: string,
	): Promise<AuthDAO> {
		const payload = RmqRecordBuilderHelper({
			email,
			username,
			password,
		});
		return await this.client.send(AuthTopics.REGISTER, payload).toPromise();
	}

	async login(username: string, password: string): Promise<TokenDAO> {
		const payload = RmqRecordBuilderHelper({
			username,
			password,
		});
		return await this.client.send(AuthTopics.LOGIN, payload).toPromise();
	}

	async refresh(id: string): Promise<TokenDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(AuthTopics.REFRESH, {
				payload,
			})
			.toPromise();
	}

	async activateAccount(email: string, token: string): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			email,
			token,
		});
		return await this.client.send(AuthTopics.ACTIVATE, payload).toPromise();
	}

	async deactivateAccount(id: string): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(AuthTopics.DEACTIVATE, payload)
			.toPromise();
	}

	async deleteAccount(id: string): Promise<void> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client.send(AuthTopics.DELETE, payload).toPromise();
	}
}
