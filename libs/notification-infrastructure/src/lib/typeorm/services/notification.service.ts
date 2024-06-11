import { NotificationService as DomainService } from '@azkaban/notification-domain';
import { NotificationRepository } from '../repositories';
import { CreateNotificationDTO } from '../../dto';
import { NotificationDAO } from '../../dao';
import { Optional } from '@toxictoast/azkaban-base-types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class NotificationService {
    private readonly domainService: DomainService;

    constructor(private readonly repository: NotificationRepository) {
        this.domainService = new DomainService(repository);
    }

    async getNotificationList(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Array<NotificationDAO>> {
        const result = await this.domainService.getNotifications(limit, offset);
        if (result.isSuccess) {
            return result.value;
        } else {
            return [];
        }
    }

    async getNotificationById(id: string): Promise<NotificationDAO> {
        const result = await this.domainService.getNotificationById(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async getNotificationByService(
        service: string,
    ): Promise<Array<NotificationDAO>> {
        const result =
            await this.domainService.getNotificationByService(service);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async getNotificationByEvent(
        event: string,
    ): Promise<Array<NotificationDAO>> {
        const result = await this.domainService.getNotificationByEvent(event);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async createNotification(
        data: CreateNotificationDTO,
    ): Promise<NotificationDAO> {
        const result = await this.domainService.createNotification(data);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async deleteNotification(id: string): Promise<NotificationDAO> {
        const result = await this.domainService.deleteNotification(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async restoreNotification(id: string): Promise<NotificationDAO> {
        const result = await this.domainService.restoreNotification(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }
}
