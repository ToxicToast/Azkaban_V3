import {
	CompanyRepository as DomainRepository,
	CompanyAnemic,
} from '@azkaban/foodfolio-domain';
import { CompanyMapper } from '../mappers';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../entities';
import { CompanyDAO } from '../../dao';

export class CompanyRepository implements DomainRepository {
	private readonly mapper: CompanyMapper = new CompanyMapper();

	constructor(private readonly repository: Repository<CompanyEntity>) {}

	async findList(
		limit?: number,
		offset?: number,
	): Promise<Array<CompanyAnemic>> {
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

	async findById(id: string): Promise<CompanyAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { id },
		});
		return this.mapper.toDomain(entity);
	}

	async findByTitle(title: string): Promise<CompanyAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { title },
		});
		return this.mapper.toDomain(entity);
	}

	async delete(id: string): Promise<CompanyAnemic> {
		await this.repository.softDelete(id);
		return await this.findById(id);
	}

	async save(data: CompanyDAO): Promise<CompanyDAO> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		return this.mapper.toDomain(saved);
	}
}
