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
		@Payload('username') username: string,
		@Payload('message') message: string,
		@Payload('args')
		args: {
			message_id: string;
			channelId: string;
			isFirst: boolean;
			isReply: boolean;
			isRedemption: boolean;
			isCheer: boolean;
			isHighlight: boolean;
			isReturningChatter: boolean;
		},
		@Payload('userInfo')
		userInfo: {
			userId: string;
			color: string;
			isBroadcaster: boolean;
			isVip: boolean;
			isMod: boolean;
			isSubscriber: boolean;
			isArtist: boolean;
			isFounder: boolean;
			userName: string;
			userType: string;
		},
	) {
		try {
			const data = {
				message_id: args.message_id,
				display_name: username,
				color: userInfo.color,
				message,
				isFirst: args.isFirst,
				isReply: args.isReply,
				isRedemption: args.isRedemption,
				isCheer: args.isCheer,
				isHighlight: args.isHighlight,
				isReturningChatter: args.isReturningChatter,
				isBroadcaster: userInfo.isBroadcaster,
				isVip: userInfo.isVip,
				isMod: userInfo.isMod,
				isSubscriber: userInfo.isSubscriber,
				isArtist: userInfo.isArtist,
				isFounder: userInfo.isFounder,
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
