import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	AuthTopics,
	CronjobTopics,
	GroupsTopics,
	RmqRecordBuilderHelper,
	UserTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';

@Injectable()
export class AzkabanVersionsService {
	constructor(
		@Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
		@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
		@Inject('GROUP_SERVICE') private readonly groupClient: ClientProxy,
		@Inject('CRONJOB_SERVICE') private readonly cronjobClient: ClientProxy,
	) {}

	private async getUsersVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.usersClient
			.send(UserTopics.VERSION, payload)
			.toPromise();
	}

	private async getAuthVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.authClient
			.send(AuthTopics.VERSION, payload)
			.toPromise();
	}

	private async getGroupsVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.groupClient
			.send(GroupsTopics.VERSION, payload)
			.toPromise();
	}

	private async getCronjobVersion() {
		const payload = RmqRecordBuilderHelper({});
		return await this.cronjobClient
			.send(CronjobTopics.VERSION, payload)
			.toPromise();
	}

	async getAzkabanVersions() {
		const auth = await this.getAuthVersion();
		const users = await this.getUsersVersion();
		const groups = await this.getGroupsVersion();
		const cronjobs = await this.getCronjobVersion();
		//
		return {
			auth,
			users,
			groups,
			cronjobs,
		};
	}
}
