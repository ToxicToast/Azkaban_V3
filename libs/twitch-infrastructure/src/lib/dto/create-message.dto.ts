export interface CreateMessageDTO {
	messageId: string;
	display_name: string;
	color: string;
	isFirst: boolean;
	isReply: boolean;
	isRedemption: boolean;
	isCheer: boolean;
	isHighlight: boolean;
	isReturningChatter: boolean;
	isBroadcaster: boolean;
	isVip: boolean;
	isMod: boolean;
	isSubscriber: boolean;
	isArtist: boolean;
	isFounder: boolean;
}
