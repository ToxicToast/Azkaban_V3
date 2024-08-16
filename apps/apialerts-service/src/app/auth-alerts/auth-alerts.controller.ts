import { Controller } from '@nestjs/common';
import { AuthAlertsService } from './auth-alerts.service';
import { EventPattern } from '@nestjs/microservices';
import { AuthTopics, NotifyTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller('alerts/auth')
export class AuthAlertsController {
	constructor(private readonly authAlerts: AuthAlertsService) {}

	@EventPattern(NotifyTopics.APIALERTS)
	onUserCreated(alert: { event: string; data: unknown }): void {
		const { event, data } = alert;
		if (event === AuthTopics.REGISTER) {
			this.authAlerts.onUserCreated(data);
		}
		return null;
	}

	@EventPattern(NotifyTopics.APIALERTS)
	onUserLogin(alert: { event: string; data: unknown }): void {
		const { event, data } = alert;
		if (event === AuthTopics.LOGIN) {
			this.authAlerts.onUserLogin(data);
		}
		return null;
	}

	@EventPattern(NotifyTopics.APIALERTS)
	onUserLoginAttempt(alert: { event: string; data: unknown }): void {
		const { event, data } = alert;
		if (event === AuthTopics.LOGIN_ATTEMPT) {
			this.authAlerts.onUserLoginAttempt(data);
		}
		return null;
	}
}
