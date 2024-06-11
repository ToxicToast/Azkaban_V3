import { Domain } from '@toxictoast/azkaban-base-domain';
import { UserGroupAnemic } from '../anemics';

export class UserGroupAggregate implements Domain<UserGroupAnemic> {
    constructor(
        private readonly id: string,
        private readonly group_id: string,
        private readonly user_id: string,
        private readonly title: string,
    ) {}

    toAnemic(): UserGroupAnemic {
        return {
            id: this.id,
            group_id: this.group_id,
            user_id: this.user_id,
            title: this.title,
        };
    }

    delete(): void {
        throw new Error('Method not implemented.');
    }

    isDeleted(): boolean {
        return false;
    }

    isUpdated(): boolean {
        return false;
    }

    restore(): void {
        throw new Error('Method not implemented.');
    }
}
