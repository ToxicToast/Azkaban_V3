import { Nullable } from '@toxictoast/azkaban-base-types';

type Notification = {
    id: string;
    service: string;
    event: string;
    payload: string;
};

export interface NotificationModel {
    data: Array<Notification>;
    selectedNotification: Nullable<Notification>;
}
