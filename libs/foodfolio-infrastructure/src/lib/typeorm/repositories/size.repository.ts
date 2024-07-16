import {
    SizeRepository as DomainRepository,
    SizeAnemic,
} from '@azkaban/foodfolio-domain';
import { Repository } from 'typeorm';
import { SizeMapper } from '../mappers';
import { SizeEntity } from '../entities';
import { SizeDAO } from '../../dao';

export class SizeRepository implements DomainRepository {
    private readonly mapper: SizeMapper = new SizeMapper();

    constructor(private readonly repository: Repository<SizeEntity>) {}

    async findList(
        limit?: number,
        offset?: number,
    ): Promise<Array<SizeAnemic>> {
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

    async findById(id: string): Promise<SizeAnemic> {
        const entity = await this.repository.findOne({
            withDeleted: true,
            where: { id },
        });
        return this.mapper.toDomain(entity);
    }

    async delete(id: string): Promise<SizeAnemic> {
        await this.repository.softDelete(id);
        return await this.findById(id);
    }

    async save(data: SizeDAO): Promise<SizeDAO> {
        const entity = this.mapper.toEntity(data);
        const saved = await this.repository.save(entity);
        return this.mapper.toDomain(saved);
    }
}
