import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
	UserTopics,
	RmqRecordBuilderHelper,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserDAO } from '@azkaban/user-infrastructure';

@Injectable()
export class UsersService {
	constructor(
		@Inject('USER_SERVICE') private readonly userClient: ClientProxy,
	) {}

	private async getAllUsers(): Promise<Array<UserDAO>> {
		const payload = RmqRecordBuilderHelper({});
		return await this.userClient.send(UserTopics.LIST, payload).toPromise();
	}

	private async getUserWithLastLoginLonger2Weeks(): Promise<Array<UserDAO>> {
		const users = await this.getAllUsers();
		return users.filter(
			(user: UserDAO) =>
				user.isActive &&
				!user.isBanned &&
				user.loggedin_at < new Date(Date.now() - 12096e5),
		);
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
		name: 'Inactive Users',
	})
	async checkForInactiveUsers(): Promise<void> {
		const users = await this.getUserWithLastLoginLonger2Weeks();
		for (const user of users) {
			const payload = RmqRecordBuilderHelper({ id: user.id });
			await this.userClient.send(UserTopics.DELETE, payload).toPromise();
		}
	}
}
