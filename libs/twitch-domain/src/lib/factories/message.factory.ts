import { Factory } from '@toxictoast/azkaban-base-domain';
import { MessageAnemic } from '../anemics';
import { MessageAggregate } from '../aggregates';
import { MessageData } from '../data';
import { MessageId } from '../valueObjects';

export class MessageFactory
	implements Factory<MessageAnemic, MessageAggregate, MessageData>
{
	reconstitute(data: MessageAnemic): MessageAggregate {
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
		return new MessageAggregate(
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
		);
	}

	constitute(data: MessageAggregate): MessageAnemic {
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
			isUpdated,
			isDeleted,
		} = data.toAnemic();
		return {
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
			isUpdated,
			isDeleted,
		};
	}

	createDomain(data: MessageData): MessageAggregate {
		const {
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
		} = data;
		const msgId = new MessageId();
		return new MessageAggregate(
			msgId.value,
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
			new Date(),
			null,
			null,
		);
	}
}
