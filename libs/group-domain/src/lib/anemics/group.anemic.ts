import { Anemic } from '@toxictoast/azkaban-base-domain';

export interface GroupAnemic extends Anemic {
    readonly title: string;
    readonly slug: string;
    readonly active: boolean;
    readonly isActive: boolean;
}
