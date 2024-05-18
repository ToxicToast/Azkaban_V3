import { Chainable } from '@toxictoast/azkaban-base-types';
import { Repository } from '@toxictoast/azkaban-base-domain';
import { NotificationAnemic } from '../anemics';

interface NotificationAdditions {
    findByService(service: string): Promise<Array<NotificationAnemic>>;
    findByEvent(event: string): Promise<Array<NotificationAnemic>>;
}

export type NotificationRepository = Chainable<
    Repository<NotificationAnemic>,
    NotificationAdditions
>;
