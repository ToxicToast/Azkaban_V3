import {
	GroupRepository as DomainRepository,
	GroupAnemic,
} from '@azkaban/group-domain';
import { GroupMapper } from '../mappers';
import { Repository } from 'typeorm';
import { GroupEntity } from '../entities';

export class GroupRepository implements DomainRepository {
	private readonly mapper: GroupMapper = new GroupMapper();

	constructor(private readonly repository: Repository<GroupEntity>) {}

	async findList(limit?: number, offset?: number): Promise<GroupAnemic[]> {
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

	async findById(id: string): Promise<GroupAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByTitle(title: string): Promise<GroupAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { title },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async delete(id: string): Promise<GroupAnemic> {
		await this.repository.softDelete(id);
		return await this.findById(id);
	}

	async save(data: GroupAnemic): Promise<GroupAnemic> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		if (saved) {
			return this.mapper.toDomain(saved);
		}
		return null;
	}
}
