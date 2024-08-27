import {
	ItemRepository as DomainRepository,
	ItemAnemic,
} from '@azkaban/foodfolio-domain';
import { Repository } from 'typeorm';
import { ItemMapper } from '../mappers';
import { ItemEntity } from '../entities';
import { ItemDAO } from '../../dao';

export class ItemRepository implements DomainRepository {
	private readonly mapper: ItemMapper = new ItemMapper();

	constructor(private readonly repository: Repository<ItemEntity>) {}

	async findList(
		limit?: number,
		offset?: number,
	): Promise<Array<ItemAnemic>> {
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

	async findById(id: string): Promise<ItemAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { id },
		});
		return this.mapper.toDomain(entity);
	}

	async findByTitle(title: string): Promise<ItemAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { title },
		});
		return this.mapper.toDomain(entity);
	}

	async delete(id: string): Promise<ItemAnemic> {
		await this.repository.softDelete(id);
		return await this.findById(id);
	}

	async save(data: ItemDAO): Promise<ItemDAO> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		return this.mapper.toDomain(saved);
	}
}
