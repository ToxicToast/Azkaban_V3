import { Domain } from '@toxictoast/azkaban-base-domain';
import { ViewerAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class ViewerAggregate implements Domain<ViewerAnemic> {
	constructor(
		private readonly id: string,
		private readonly display_name: string,
		private joins: number,
		private parts: number,
		private messages: number,
		private timeouts: number,
		private bans: number,
		private minutes_watched: number,
		private lastseen_at: Nullable<Date>,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {}

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

	toAnemic(): ViewerAnemic {
		return {
			id: this.id,
			display_name: this.display_name,
			lastseen_at: this.lastseen_at,
			joins: this.joins,
			parts: this.parts,
			messages: this.messages,
			timeouts: this.timeouts,
			bans: this.bans,
			minutes_watched: this.minutes_watched,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
			isUpdated: this.isUpdated(),
			isDeleted: this.isDeleted(),
		};
	}

	updateLastSeenAt(lastseen_at: Nullable<Date>): void {
		if (this.lastseen_at !== lastseen_at) {
			this.updated_at = new Date();
			this.lastseen_at = lastseen_at;
		}
	}

	updateJoins(joins: number): void {
		if (this.joins !== joins) {
			this.updated_at = new Date();
			this.joins = joins;
		}
	}

	updateParts(parts: number): void {
		if (this.parts !== parts) {
			this.updated_at = new Date();
			this.parts = parts;
		}
	}

	updateMessages(messages: number): void {
		if (this.messages !== messages) {
			this.updated_at = new Date();
			this.messages = messages;
		}
	}

	updateTimeouts(timeouts: number): void {
		if (this.timeouts !== timeouts) {
			this.updated_at = new Date();
			this.timeouts = timeouts;
		}
	}

	updateBans(bans: number): void {
		if (this.bans !== bans) {
			this.updated_at = new Date();
			this.bans = bans;
		}
	}

	updateMinutesWatched(minutes_watched: number): void {
		if (this.minutes_watched !== minutes_watched) {
			this.updated_at = new Date();
			this.minutes_watched = minutes_watched;
		}
	}
}
