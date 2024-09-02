import {
	TypeRepository as DomainRepository,
	TypeAnemic,
} from '@azkaban/foodfolio-domain';
import { Repository } from 'typeorm';
import { TypeMapper } from '../mappers';
import { TypeEntity } from '../entities';
import { TypeDAO } from '../../dao';

export class TypeRepository implements DomainRepository {
	private readonly mapper: TypeMapper = new TypeMapper();

	constructor(private readonly repository: Repository<TypeEntity>) {}

	async findList(
		limit?: number,
		offset?: number,
	): Promise<Array<TypeAnemic>> {
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

	async findById(id: string): Promise<TypeAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { id },
		});
		return this.mapper.toDomain(entity);
	}

	async findByTitle(title: string): Promise<TypeAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { title },
		});
		return this.mapper.toDomain(entity);
	}

	async delete(id: string): Promise<TypeAnemic> {
		await this.repository.softDelete(id);
		return await this.findById(id);
	}

	async save(data: TypeDAO): Promise<TypeDAO> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		return this.mapper.toDomain(saved);
	}
}
