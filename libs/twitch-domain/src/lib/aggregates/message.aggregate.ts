import { Domain } from '@toxictoast/azkaban-base-domain';
import { MessageAnemic } from '../anemics';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class MessageAggregate implements Domain<MessageAnemic> {
	constructor(
		private readonly id: string,
		private readonly messageId: string,
		private readonly display_name: string,
		private readonly message: string,
		private readonly color: string,
		private readonly isFirst: boolean,
		private readonly isReply: boolean,
		private readonly isRedemption: boolean,
		private readonly isCheer: boolean,
		private readonly isHighlight: boolean,
		private readonly isReturningChatter: boolean,
		private readonly isBroadcaster: boolean,
		private readonly isVip: boolean,
		private readonly isMod: boolean,
		private readonly isSubscriber: boolean,
		private readonly isArtist: boolean,
		private readonly isFounder: boolean,
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

	toAnemic(): MessageAnemic {
		return {
			id: this.id,
			messageId: this.messageId,
			display_name: this.display_name,
			message: this.message,
			color: this.color,
			isFirst: this.isFirst,
			isReply: this.isReply,
			isRedemption: this.isRedemption,
			isCheer: this.isCheer,
			isHighlight: this.isHighlight,
			isReturningChatter: this.isReturningChatter,
			isBroadcaster: this.isBroadcaster,
			isVip: this.isVip,
			isMod: this.isMod,
			isSubscriber: this.isSubscriber,
			isArtist: this.isArtist,
			isFounder: this.isFounder,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
			isUpdated: this.isUpdated(),
			isDeleted: this.isDeleted(),
		};
	}
}
