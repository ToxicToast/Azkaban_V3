import {
    UserRepository as DomainRepository,
    UserAnemic,
} from '@azkaban/user-domain';
import { Repository } from 'typeorm';
import { UserMapper } from '../mappers';
import { UserEntity } from '../entities';
import { UserDAO } from '../../dao';

export class UserRepository implements DomainRepository {
    private readonly mapper: UserMapper = new UserMapper();

    constructor(private readonly repository: Repository<UserEntity>) {}

    async findList(limit?: number, offset?: number): Promise<UserAnemic[]> {
        const entities = await this.repository.find({
            take: limit,
            skip: offset,
            withDeleted: true,
            relations: ['groups', 'groups.group'],
        });
        return entities.map((entity) => this.mapper.toDomain(entity));
    }

    async findById(id: string): Promise<UserAnemic> {
        const entity = await this.repository.findOne({
            withDeleted: true,
            where: { id },
            relations: ['groups', 'groups.group'],
        });
        if (entity) {
            return this.mapper.toDomain(entity);
        }
        return null;
    }

    async delete(id: string): Promise<UserAnemic> {
        await this.repository.softDelete(id);
        return await this.findById(id);
    }

    async save(data: UserDAO): Promise<UserDAO> {
        const entity = this.mapper.toEntity(data);
        const saved = await this.repository.save(entity);
        if (saved) {
            return this.mapper.toDomain(saved);
        }
        return null;
    }
}
