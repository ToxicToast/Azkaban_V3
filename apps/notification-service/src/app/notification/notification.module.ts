import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import {
    datasourceProvider,
    notificationProvider,
} from '@azkaban/notification-infrastructure';

@Module({
    controllers: [NotificationController],
    providers: [
        ...datasourceProvider,
        ...notificationProvider,
        NotificationService,
    ],
})
export class NotificationModule {}
