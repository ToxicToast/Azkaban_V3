import {
    ItemDetailRepository as DomainRepository,
    ItemDetailAnemic,
} from '@azkaban/foodfolio-domain';
import { Repository } from 'typeorm';
import { ItemDetailMapper } from '../mappers';
import { ItemDetailEntity } from '../entities';
import { ItemDetailDAO } from '../../dao';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class ItemDetailRepository implements DomainRepository {
    private readonly mapper: ItemDetailMapper = new ItemDetailMapper();

    constructor(private readonly repository: Repository<ItemDetailEntity>) {}

    async findList(
        limit?: number,
        offset?: number,
    ): Promise<Array<ItemDetailAnemic>> {
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

    async findByItemId(
        item_id: Nullable<string>,
    ): Promise<Array<ItemDetailAnemic>> {
        const entities = await this.repository.find({
            where: { item_id },
            withDeleted: true,
        });
        return entities.map((entity) => this.mapper.toDomain(entity));
    }

    async findById(id: string): Promise<ItemDetailAnemic> {
        const entity = await this.repository.findOne({
            withDeleted: true,
            where: { id },
        });
        return this.mapper.toDomain(entity);
    }

    async delete(id: string): Promise<ItemDetailAnemic> {
        await this.repository.softDelete(id);
        return await this.findById(id);
    }

    async save(data: ItemDetailDAO): Promise<ItemDetailDAO> {
        const entity = this.mapper.toEntity(data);
        const saved = await this.repository.save(entity);
        return this.mapper.toDomain(saved);
    }
}
