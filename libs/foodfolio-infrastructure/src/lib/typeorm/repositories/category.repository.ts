import {
	CategoryRepository as DomainRepository,
	CategoryAnemic,
} from '@azkaban/foodfolio-domain';
import { Repository } from 'typeorm';
import { CategoryMapper } from '../mappers';
import { CategoryEntity } from '../entities';
import { CategoryDAO } from '../../dao';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class CategoryRepository implements DomainRepository {
	private readonly mapper: CategoryMapper = new CategoryMapper();

	constructor(private readonly repository: Repository<CategoryEntity>) {}

	async findList(
		limit?: number,
		offset?: number,
	): Promise<Array<CategoryAnemic>> {
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

	async findByParentId(
		parent_id: Nullable<string>,
	): Promise<Array<CategoryAnemic>> {
		const entities = await this.repository.find({
			withDeleted: true,
			where: { parent_id },
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findById(id: string): Promise<CategoryAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { id },
		});
		return this.mapper.toDomain(entity);
	}

	async findByTitle(title: string): Promise<CategoryAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { title },
		});
		return this.mapper.toDomain(entity);
	}

	async delete(id: string): Promise<CategoryAnemic> {
		await this.repository.softDelete(id);
		return await this.findById(id);
	}

	async save(data: CategoryDAO): Promise<CategoryDAO> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		return this.mapper.toDomain(saved);
	}
}
