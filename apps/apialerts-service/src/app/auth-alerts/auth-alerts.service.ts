import { Injectable } from '@nestjs/common';
import { AlertsService } from '../alerts.service';

@Injectable()
export class AuthAlertsService {
	constructor(private readonly service: AlertsService) {}

	onUserCreated(data: unknown): void {
		const eventData = data as { username: string };
		const message = `New User: ${eventData.username}`;
		const tags = ['azkaban', 'auth', 'register'];
		this.service.sendAlert(message, tags);
	}

	onUserLogin(data: unknown): void {
		const eventData = data as { username: string };
		const message = `User Login: ${eventData.username}`;
		const tags = ['azkaban', 'auth', 'login'];
		this.service.sendAlert(message, tags);
	}

	onUserLoginAttempt(data: unknown): void {
		const eventData = data as { username: string };
		const message = `User Login Attempt: ${eventData.username}`;
		const tags = ['azkaban', 'auth', 'login', 'attempt'];
		this.service.sendAlert(message, tags);
	}
}
