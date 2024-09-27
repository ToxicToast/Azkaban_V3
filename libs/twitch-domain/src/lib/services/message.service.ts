import { MessageFactory } from '../factories';
import { MessageRepository } from '../repositories';
import { MessageAnemic } from '../anemics';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Optional } from '@toxictoast/azkaban-base-types';
import { GenericErrorCodes } from '@toxictoast/azkaban-base-helpers';
import { MessageData } from '../data';

export class MessageService {
	private readonly factory: MessageFactory = new MessageFactory();

	constructor(private readonly repository: MessageRepository) {}

	private async save(anemic: MessageAnemic): Promise<Result<MessageAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<MessageAnemic>(result);
		} catch (error) {
			return Result.fail<MessageAnemic>(error);
		}
	}

	async getMessages(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Result<Array<MessageAnemic>>> {
		try {
			const result = await this.repository.findList(limit, offset);
			return Result.ok<Array<MessageAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<MessageAnemic>>(error);
		}
	}

	async getMessageById(id: string): Promise<Result<MessageAnemic>> {
		try {
			const result = await this.repository.findById(id);
			if (result !== null) {
				return Result.ok<MessageAnemic>(result);
			}
			return Result.fail<MessageAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<MessageAnemic>(error);
		}
	}

	async getMessageByMessageId(
		message_id: string,
	): Promise<Result<MessageAnemic>> {
		try {
			const result = await this.repository.findByMessageId(message_id);
			if (result !== null) {
				return Result.ok<MessageAnemic>(result);
			}
			return Result.fail<MessageAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<MessageAnemic>(error);
		}
	}

	async createMessage(data: MessageData): Promise<Result<MessageAnemic>> {
		try {
			const check = await this.getMessageById(data.messageId);
			if (check.isSuccess) {
				return Result.fail<MessageAnemic>(GenericErrorCodes.UNKNOWN);
			}
			const aggregate = this.factory.createDomain(data);
			return await this.save(aggregate.toAnemic());
		} catch (error) {
			return Result.fail<MessageAnemic>(error);
		}
	}

	async deleteMessage(id: string): Promise<Result<MessageAnemic>> {
		try {
			const viewer = await this.getMessageById(id);
			if (viewer.isSuccess) {
				const viewerValue = viewer.value;
				const aggregate = this.factory.reconstitute(viewerValue);
				aggregate.delete();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<MessageAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<MessageAnemic>(error);
		}
	}

	async restoreMessage(id: string): Promise<Result<MessageAnemic>> {
		try {
			const viewer = await this.getMessageById(id);
			if (viewer.isSuccess) {
				const viewerValue = viewer.value;
				const aggregate = this.factory.reconstitute(viewerValue);
				aggregate.restore();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<MessageAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<MessageAnemic>(error);
		}
	}
}
