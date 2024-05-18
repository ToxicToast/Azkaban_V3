import { Injectable } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Injectable()
export class AuthAlertsService {
    constructor(private readonly service: AlertsService) {}

    onUserCreated(data: unknown): void {
        const eventData = data as { username: string };
        const message = `New User: ${eventData.username}`;
        const tags = ['azkaban', 'auth', 'register'];
        this.service.sendAlert(message, tags);
    }

    onUserDeactivated(data: unknown): void {
        const eventData = data as { username: string };
        const message = `User Ban: ${eventData.username}`;
        const tags = ['azkaban', 'auth', 'ban'];
        this.service.sendAlert(message, tags);
    }

    onUserDeleted(data: unknown): void {
        const eventData = data as { username: string };
        const message = `User Deleted: ${eventData.username}`;
        const tags = ['azkaban', 'auth', 'delete'];
        this.service.sendAlert(message, tags);
    }

    onUserRestored(data: unknown): void {
        const eventData = data as { username: string };
        const message = `User Restored: ${eventData.username}`;
        const tags = ['azkaban', 'auth', 'restore'];
        this.service.sendAlert(message, tags);
    }

    onUserLogin(data: unknown): void {
        const eventData = data as { username: string };
        const message = `User Login: ${eventData.username}`;
        const tags = ['azkaban', 'auth', 'login'];
        this.service.sendAlert(message, tags);
    }
}
