import { Anemic } from '@toxictoast/azkaban-base-domain';

export interface NotificationAnemic extends Anemic {
    readonly service: string;
    readonly event: string;
    readonly payload: unknown;
}
