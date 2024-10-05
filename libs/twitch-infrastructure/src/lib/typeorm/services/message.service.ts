import { MessageService as DomainService } from '@azkaban/twitch-domain';
import { MessageRepository } from '../repositories';
import { Optional } from '@toxictoast/azkaban-base-types';
import { MessageDAO } from '../../dao';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateMessageDTO } from '../../dto';

export class MessageService {
	private readonly domainService: DomainService;

	constructor(private readonly repository: MessageRepository) {
		this.domainService = new DomainService(repository);
	}

	async getMessageList(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Array<MessageDAO>> {
		const result = await this.domainService.getMessages(limit, offset);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getMessageById(id: string): Promise<MessageDAO> {
		const result = await this.domainService.getMessageById(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getMessageByMessageId(id: string): Promise<MessageDAO> {
		const result = await this.domainService.getMessageByMessageId(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getMessageByDisplayName(
		display_name: string,
	): Promise<Array<MessageDAO>> {
		const result =
			await this.domainService.getMessageByDisplayName(display_name);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async createMessage(data: CreateMessageDTO): Promise<MessageDAO> {
		const result = await this.domainService.createMessage(data);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async deleteMessage(id: string): Promise<MessageDAO> {
		const result = await this.domainService.deleteMessage(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async restoreMessage(id: string): Promise<MessageDAO> {
		const result = await this.domainService.restoreMessage(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}
}
