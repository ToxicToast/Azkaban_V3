import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { NotificationAnemic } from '../anemics';
import { NotificationFactory } from '../factories';
import { NotificationData } from '../data';
import { Result } from '@toxictoast/azkaban-base-domain';
import { NotificationRepository } from '../repositories';

export class NotificationService {
  private readonly factory: NotificationFactory = new NotificationFactory();

  constructor(private readonly repository: NotificationRepository) {}

  private async save(
    anemic: NotificationAnemic
  ): Promise<Result<NotificationAnemic>> {
    try {
      const result = await this.repository.save(anemic);
      return Result.ok<NotificationAnemic>(result);
    } catch (error) {
      return Result.fail<NotificationAnemic>(error);
    }
  }

  async getNotifications(
    limit?: Optional<number>,
    offset?: Optional<number>
  ): Promise<Result<Array<NotificationAnemic>>> {
    try {
      const result = await this.repository.findList(limit, offset);
      return Result.ok<Array<NotificationAnemic>>(result);
    } catch (error) {
      return Result.fail<Array<NotificationAnemic>>(error);
    }
  }

  async getNotificationById(id: string): Promise<Result<NotificationAnemic>> {
    try {
      const result = await this.repository.findById(id);
      if (result !== null) {
        return Result.ok<Nullable<NotificationAnemic>>(result);
      }
      return Result.fail<Nullable<NotificationAnemic>>(
        'Notification not found'
      );
    } catch (error) {
      return Result.fail<Nullable<NotificationAnemic>>(error);
    }
  }

  async getNotificationByService(
    service: string
  ): Promise<Result<Array<NotificationAnemic>>> {
    try {
      const result = await this.repository.findByService(service);
      if (result.length > 0) {
        return Result.ok<Array<NotificationAnemic>>(result);
      }
      return Result.fail<Array<NotificationAnemic>>('Notification not found');
    } catch (error) {
      return Result.fail<Array<NotificationAnemic>>(error);
    }
  }

  async getNotificationByEvent(
    event: string
  ): Promise<Result<Array<NotificationAnemic>>> {
    try {
      const result = await this.repository.findByEvent(event);
      if (result.length > 0) {
        return Result.ok<Array<NotificationAnemic>>(result);
      }
      return Result.fail<Array<NotificationAnemic>>('Notification not found');
    } catch (error) {
      return Result.fail<Array<NotificationAnemic>>(error);
    }
  }

  async createNotification(
    data: NotificationData
  ): Promise<Result<NotificationAnemic>> {
    try {
      const aggregate = this.factory.createDomain(data);
      return await this.save(aggregate.toAnemic());
    } catch (error) {
      return Result.fail<NotificationAnemic>(error);
    }
  }

  async deleteNotification(id: string): Promise<Result<NotificationAnemic>> {
    try {
      const notification = await this.getNotificationById(id);
      if (notification.isSuccess) {
        const notificationValue = notification.value;
        const aggregate = this.factory.reconstitute(notificationValue);
        aggregate.delete();
        return await this.save(aggregate.toAnemic());
      }
      return Result.fail<NotificationAnemic>('Notification not found');
    } catch (error) {
      return Result.fail<NotificationAnemic>(error);
    }
  }

  async restoreNotification(id: string): Promise<Result<NotificationAnemic>> {
    try {
      const notification = await this.getNotificationById(id);
      if (notification.isSuccess) {
        const notificationValue = notification.value;
        const aggregate = this.factory.reconstitute(notificationValue);
        aggregate.restore();
        return await this.save(aggregate.toAnemic());
      }
      return Result.fail<NotificationAnemic>('Notification not found');
    } catch (error) {
      return Result.fail<NotificationAnemic>(error);
    }
  }
}
