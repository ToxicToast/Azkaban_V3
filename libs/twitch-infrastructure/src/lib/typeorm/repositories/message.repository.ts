import {
	MessageRepository as DomainRepository,
	MessageAnemic,
} from '@azkaban/twitch-domain';
import { Repository } from 'typeorm';
import { MessageMapper } from '../mappers';
import { MessageEntity } from '../entities';

export class MessageRepository implements DomainRepository {
	private readonly mapper: MessageMapper = new MessageMapper();

	constructor(private readonly repository: Repository<MessageEntity>) {}

	async findList(
		limit?: number,
		offset?: number,
	): Promise<Array<MessageAnemic>> {
		const entities = await this.repository.find({
			take: limit,
			skip: offset,
			withDeleted: true,
			order: {
				created_at: 'ASC',
			},
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findById(id: string): Promise<MessageAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByMessageId(message_id: string): Promise<MessageAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { message_id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByDisplayName(
		display_name: string,
	): Promise<Array<MessageAnemic>> {
		const entities = await this.repository.find({
			withDeleted: true,
			where: { display_name },
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async delete(id: string): Promise<MessageAnemic> {
		await this.repository.softDelete(id);
		return await this.findById(id);
	}

	async save(data: MessageAnemic): Promise<MessageAnemic> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		if (saved) {
			return this.mapper.toDomain(saved);
		}
		return null;
	}
}
