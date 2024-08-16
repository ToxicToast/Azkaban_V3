import { Domain } from '@toxictoast/azkaban-base-domain';
import { AuthAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class AuthAggregate implements Domain<AuthAnemic> {
	constructor(
		private readonly id: string,
		private username: string,
		private password: string,
		private email: string,
		private activation_token: Nullable<string>,
		private activated_at: Nullable<Date>,
		private banned_at: Nullable<Date>,
		private loggedin_at: Nullable<Date>,
		private groups: Array<string>,
	) {}

	isUpdated(): boolean {
		throw new Error('Method not implemented.');
	}
	isDeleted(): boolean {
		throw new Error('Method not implemented.');
	}
	delete(): void {
		throw new Error('Method not implemented.');
	}
	restore(): void {
		throw new Error('Method not implemented.');
	}

	isActive(): boolean {
		return !!this.activated_at;
	}

	isBanned(): boolean {
		return !!this.banned_at;
	}

	toAnemic(): AuthAnemic {
		return {
			id: this.id,
			username: this.username,
			password: this.password,
			email: this.email,
			activation_token: this.activation_token,
			activated_at: this.activated_at,
			banned_at: this.banned_at,
			isActive: this.isActive(),
			isBanned: this.isBanned(),
			loggedin_at: this.loggedin_at,
			groups: this.groups,
		};
	}

	updateActivation(): void {
		this.activated_at = new Date();
		this.activation_token = null;
	}

	updateLogin(): void {
		this.loggedin_at = new Date();
	}
}
