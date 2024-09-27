export interface MessageData {
	readonly messageId: string;
	readonly display_name: string;
	readonly message: string;
	readonly color: string;
	readonly isFirst: boolean;
	readonly isReply: boolean;
	readonly isRedemption: boolean;
	readonly isCheer: boolean;
	readonly isHighlight: boolean;
	readonly isReturningChatter: boolean;
	readonly isBroadcaster: boolean;
	readonly isVip: boolean;
	readonly isMod: boolean;
	readonly isSubscriber: boolean;
	readonly isArtist: boolean;
	readonly isFounder: boolean;
}
