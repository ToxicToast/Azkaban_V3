import {
    LocationRepository as DomainRepository,
    LocationAnemic,
} from '@azkaban/foodfolio-domain';
import { Repository } from 'typeorm';
import { LocationMapper } from '../mappers';
import { LocationEntity } from '../entities';
import { LocationDAO } from '../../dao';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class LocationRepository implements DomainRepository {
    private readonly mapper: LocationMapper = new LocationMapper();

    constructor(private readonly repository: Repository<LocationEntity>) {}

    async findList(
        limit?: number,
        offset?: number,
    ): Promise<Array<LocationAnemic>> {
        const entities = await this.repository.find({
            take: limit,
            skip: offset,
            withDeleted: true,
        });
        return entities.map((entity) => this.mapper.toDomain(entity));
    }

    async findByParentId(
        parent_id: Nullable<string>,
    ): Promise<Array<LocationAnemic>> {
        const entities = await this.repository.find({
            withDeleted: true,
            where: { parent_id },
        });
        return entities.map((entity) => this.mapper.toDomain(entity));
    }

    async findByFreezer(freezer: boolean): Promise<Array<LocationAnemic>> {
        const entities = await this.repository.find({
            withDeleted: true,
            where: { freezer },
        });
        return entities.map((entity) => this.mapper.toDomain(entity));
    }

    async findById(id: string): Promise<LocationAnemic> {
        const entity = await this.repository.findOne({
            withDeleted: true,
            where: { id },
        });
        return this.mapper.toDomain(entity);
    }

    async delete(id: string): Promise<LocationAnemic> {
        await this.repository.softDelete(id);
        return await this.findById(id);
    }

    async save(data: LocationDAO): Promise<LocationDAO> {
        const entity = this.mapper.toEntity(data);
        const saved = await this.repository.save(entity);
        return this.mapper.toDomain(saved);
    }
}
