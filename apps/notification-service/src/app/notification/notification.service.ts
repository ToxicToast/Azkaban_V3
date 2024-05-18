import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  NotificationRepository,
  NotificationEntity,
  NotificationService as BaseService,
  NotificationDAO,
} from '@azkaban/notification-infrastructure';

@Injectable()
export class NotificationService {
  private readonly infrastructureRepository: NotificationRepository;
  private readonly infrastructureService: BaseService;

  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private readonly notificationRepository: Repository<NotificationEntity>
  ) {
    this.infrastructureRepository = new NotificationRepository(
      this.notificationRepository
    );
    this.infrastructureService = new BaseService(this.infrastructureRepository);
  }

  async createNotification(
    service: string,
    event: string,
    payload: unknown
  ): Promise<NotificationDAO> {
    return await this.infrastructureService.createNotification({
      service,
      event,
      payload,
    });
  }
}
