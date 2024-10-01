import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { TwitchMessageTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller('message')
export class MessageController {
	constructor(private readonly service: MessageService) {}

	@MessagePattern(TwitchMessageTopics.LIST)
	async getMessageList(
		@Payload('limit') limit: number,
		@Payload('offset') offset: number,
	) {
		try {
			return await this.service.getList(limit, offset);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchMessageTopics.ID)
	async getMessageById(@Payload('id') id: string) {
		try {
			return await this.service.getById(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchMessageTopics.CREATE)
	async createMessage(
		@Payload('message_id') message_id: string,
		@Payload('display_name') display_name: string,
		@Payload('color') color: string,
		@Payload('message') message: string,
		@Payload('isFirst') isFirst: boolean,
		@Payload('isReply') isReply: boolean,
		@Payload('isRedemption') isRedemption: boolean,
		@Payload('isCheer') isCheer: boolean,
		@Payload('isHighlight') isHighlight: boolean,
		@Payload('isReturningChatter') isReturningChatter: boolean,
		@Payload('isBroadcaster') isBroadcaster: boolean,
		@Payload('isVip') isVip: boolean,
		@Payload('isMod') isMod: boolean,
		@Payload('isSubscriber') isSubscriber: boolean,
		@Payload('isArtist') isArtist: boolean,
		@Payload('isFounder') isFounder: boolean,
	) {
		try {
			const data = {
				message_id,
				display_name,
				color,
				message,
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
			};
			return await this.service.createMessage(data);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchMessageTopics.DELETE)
	async deleteMessage(@Payload('id') id: string) {
		try {
			return await this.service.deleteMessage(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchMessageTopics.RESTORE)
	async restoreMessage(@Payload('id') id: string) {
		try {
			return await this.service.restoreMessage(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}
}
