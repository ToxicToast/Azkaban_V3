import { Optional } from '@toxictoast/azkaban-base-types';

export interface UpdateGroupDTO {
    title?: Optional<string>;
    slug?: Optional<string>;
    active?: Optional<boolean>;
}
