import { SetMetadata } from '@nestjs/common';

export const Groups = (...groups: Array<string>) =>
    SetMetadata('groups', groups);
