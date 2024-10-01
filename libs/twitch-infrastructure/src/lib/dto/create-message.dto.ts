export interface CreateMessageDTO {
	message_id: string;
	display_name: string;
	color: string;
	message: string;
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
