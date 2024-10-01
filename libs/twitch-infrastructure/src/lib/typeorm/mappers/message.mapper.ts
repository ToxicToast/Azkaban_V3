import { Mapper } from '@toxictoast/azkaban-base-domain';
import { MessageFactory } from '@azkaban/twitch-domain';
import { MessageDAO } from '../../dao';
import { MessageEntity } from '../entities';

export class MessageMapper implements Mapper<MessageDAO, MessageEntity> {
	private readonly domainFactory: MessageFactory = new MessageFactory();

	toEntity(data: MessageDAO): MessageEntity {
		const {
			id,
			message_id,
			display_name,
			message,
			color,
			isFirst,
			isReply,
			isRedemption,
			isCheer,
			isHighlight,
			isReturningChatter,
			isBroadcaster,
			isVip,
			isMod,
			isSubscriber,
			isArtist,
			isFounder,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const entity = new MessageEntity();
		entity.id = id;
		entity.message_id = message_id;
		entity.display_name = display_name;
		entity.message = message;
		entity.color = color;
		entity.first = isFirst;
		entity.reply = isReply;
		entity.redemption = isRedemption;
		entity.cheer = isCheer;
		entity.highlight = isHighlight;
		entity.returning_chatter = isReturningChatter;
		entity.broadcaster = isBroadcaster;
		entity.vip = isVip;
		entity.mod = isMod;
		entity.subscriber = isSubscriber;
		entity.artist = isArtist;
		entity.founder = isFounder;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		return entity;
	}

	toDomain(data: MessageEntity): MessageDAO {
		const {
			id,
			message_id,
			display_name,
			message,
			color,
			first,
			reply,
			redemption,
			cheer,
			highlight,
			returning_chatter,
			broadcaster,
			vip,
			mod,
			subscriber,
			artist,
			founder,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const aggregate = this.domainFactory.reconstitute({
			id,
			message_id,
			display_name,
			message,
			color,
			isFirst: first,
			isReply: reply,
			isRedemption: redemption,
			isCheer: cheer,
			isHighlight: highlight,
			isReturningChatter: returning_chatter,
			isBroadcaster: broadcaster,
			isVip: vip,
			isMod: mod,
			isSubscriber: subscriber,
			isArtist: artist,
			isFounder: founder,
			created_at,
			updated_at,
			deleted_at,
			isUpdated: !!updated_at,
			isDeleted: !!deleted_at,
		});
		return this.domainFactory.constitute(aggregate);
	}
}
