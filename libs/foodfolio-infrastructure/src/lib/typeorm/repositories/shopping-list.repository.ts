import {
	ShoppingListRepository as DomainRepository,
	ShoppingListAnemic,
} from '@azkaban/foodfolio-domain';
import { Repository } from 'typeorm';
import { ShoppingListMapper } from '../mappers';
import { ShoppingListEntity } from '../entities';
import { ShoppingListDAO } from '../../dao';

export class ShoppingListRepository implements DomainRepository {
	private readonly mapper: ShoppingListMapper = new ShoppingListMapper();

	constructor(private readonly repository: Repository<ShoppingListEntity>) {}

	async findList(
		limit?: number,
		offset?: number,
	): Promise<Array<ShoppingListAnemic>> {
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

	async findById(id: string): Promise<ShoppingListAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { id },
		});
		return this.mapper.toDomain(entity);
	}

	async findByItemId(item_id: string): Promise<Array<ShoppingListAnemic>> {
		const entities = await this.repository.find({
			withDeleted: true,
			where: { item_id },
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async delete(id: string): Promise<ShoppingListAnemic> {
		await this.repository.softDelete(id);
		return await this.findById(id);
	}

	async save(data: ShoppingListDAO): Promise<ShoppingListDAO> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		return this.mapper.toDomain(saved);
	}
}
