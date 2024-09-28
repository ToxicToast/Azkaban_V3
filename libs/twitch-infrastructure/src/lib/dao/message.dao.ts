import { Nullable } from '@toxictoast/azkaban-base-types';

export interface MessageDAO {
	id: string;
	messageId: string;
	display_name: string;
	message: string;
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
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
	isUpdated: boolean;
	isDeleted: boolean;
}
