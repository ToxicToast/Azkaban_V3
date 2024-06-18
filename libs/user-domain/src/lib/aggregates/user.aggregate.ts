import { Domain } from '@toxictoast/azkaban-base-domain';
import { UserAnemic, UserGroupAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { UserActivationCode, UserPassword } from '../valueObjects';

export class UserAggregate implements Domain<UserAnemic> {
    constructor(
        private readonly id: string,
        private username: string,
        private password: string,
        private email: string,
        private activation_token: Nullable<string>,
        private activated_at: Nullable<Date>,
        private banned_at: Nullable<Date>,
        private readonly created_at: Date,
        private updated_at: Nullable<Date>,
        private deleted_at: Nullable<Date>,
        private groups: Array<UserGroupAnemic>,
    ) {}

    isActive(): boolean {
        return !!this.activated_at;
    }

    isBanned(): boolean {
        return !!this.banned_at;
    }

    isUpdated(): boolean {
        return !!this.updated_at;
    }

    isDeleted(): boolean {
        return !!this.deleted_at;
    }

    delete(): void {
        this.deleted_at = new Date();
    }

    restore(): void {
        this.deleted_at = null;
    }

    toAnemic(): UserAnemic {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            email: this.email,
            activation_token: this.activation_token,
            activated_at: this.activated_at,
            banned_at: this.banned_at,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
            isActive: this.isActive(),
            isBanned: this.isBanned(),
            isUpdated: this.isUpdated(),
            isDeleted: this.isDeleted(),
            groups: this.groups,
        };
    }

    changeUsername(username: string): void {
        if (this.username !== username) {
            this.updated_at = new Date();
            this.username = username;
        }
    }

    changeEmail(email: string): void {
        if (this.email !== email) {
            this.updated_at = new Date();
            this.email = email;
        }
    }

    changePassword(password: string): void {
        const passwordVO = new UserPassword(this.password);
        const newPasswordVO = new UserPassword(password);
        if (!passwordVO.equals(newPasswordVO)) {
            this.updated_at = new Date();
            this.password = newPasswordVO.value;
        }
    }

    changeActivationToken(activation_token: Nullable<string>): void {
        const activationTokenVO = new UserActivationCode(this.activation_token);
        const newActivationTokenVO = new UserActivationCode(activation_token);
        if (!activationTokenVO.equals(newActivationTokenVO)) {
            this.updated_at = new Date();
            this.activation_token = newActivationTokenVO.value;
        }
    }

    changeActivatedAt(activated_at: Nullable<Date>): void {
        this.updated_at = new Date();
        this.activated_at = activated_at;
    }

    changeBannedAt(banned_at: Nullable<Date>): void {
        this.updated_at = new Date();
        this.banned_at = banned_at;
    }
}
