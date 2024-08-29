import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
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
		const payload = new RmqRecordBuilder({
			email,
			username,
			password,
		}).build();
		return await this.client.send(AuthTopics.REGISTER, payload).toPromise();
	}

	async login(username: string, password: string): Promise<TokenDAO> {
		const payload = new RmqRecordBuilder({ username, password }).build();
		return await this.client.send(AuthTopics.LOGIN, payload).toPromise();
	}

	async refresh(id: string): Promise<TokenDAO> {
		const payload = new RmqRecordBuilder({ id }).build();
		return await this.client
			.send(AuthTopics.REFRESH, {
				payload,
			})
			.toPromise();
	}

	async activateAccount(email: string, token: string): Promise<void> {
		const payload = new RmqRecordBuilder({ email, token }).build();
		return await this.client.send(AuthTopics.ACTIVATE, payload).toPromise();
	}

	async deactivateAccount(id: string): Promise<void> {
		const payload = new RmqRecordBuilder({ id }).build();
		return await this.client
			.send(AuthTopics.DEACTIVATE, payload)
			.toPromise();
	}

	async deleteAccount(id: string): Promise<void> {
		const payload = new RmqRecordBuilder({ id }).build();
		return await this.client.send(AuthTopics.DELETE, payload).toPromise();
	}
}
