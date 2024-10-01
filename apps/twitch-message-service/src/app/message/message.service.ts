import { Inject, Injectable } from '@nestjs/common';
import {
	CreateMessageDTO,
	MessageDAO,
	MessageEntity,
	MessageRepository,
	MessageService as BaseService,
} from '@azkaban/twitch-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
	private readonly infrastructureRepository: MessageRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('MESSAGE_REPOSITORY')
		private readonly messageRepository: Repository<MessageEntity>,
	) {
		this.infrastructureRepository = new MessageRepository(
			this.messageRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

	async getList(limit: number, offset: number): Promise<Array<MessageDAO>> {
		return await this.infrastructureService.getMessageList(limit, offset);
	}

	async getById(id: string): Promise<MessageDAO> {
		return await this.infrastructureService.getMessageById(id);
	}

	async getByDisplayName(displayName: string): Promise<Array<MessageDAO>> {
		return await this.infrastructureService.getMessageByDisplayName(
			displayName,
		);
	}

	async createMessage(data: CreateMessageDTO): Promise<MessageDAO> {
		return await this.infrastructureService.createMessage(data);
	}

	async deleteMessage(id: string): Promise<MessageDAO> {
		return await this.infrastructureService.deleteMessage(id);
	}

	async restoreMessage(id: string): Promise<MessageDAO> {
		return await this.infrastructureService.restoreMessage(id);
	}
}
