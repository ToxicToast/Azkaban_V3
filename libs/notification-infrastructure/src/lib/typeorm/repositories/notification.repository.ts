import {
    NotificationRepository as DomainRepository,
    NotificationAnemic,
} from '@azkaban/notification-domain';
import { Repository } from 'typeorm';
import { NotificationMapper } from '../mappers';
import { NotificationEntity } from '../entities';
import { NotificationDAO } from '../../dao';

export class NotificationRepository implements DomainRepository {
    private readonly mapper: NotificationMapper = new NotificationMapper();

    constructor(private readonly repository: Repository<NotificationEntity>) {}

    async findList(
        limit?: number,
        offset?: number,
    ): Promise<NotificationAnemic[]> {
        const entities = await this.repository.find({
            take: limit,
            skip: offset,
            withDeleted: true,
        });
        return entities.map((entity) => this.mapper.toDomain(entity));
    }

    async findByService(service: string): Promise<Array<NotificationAnemic>> {
        const entities = await this.repository.find({
            where: { service },
            withDeleted: true,
        });
        return entities.map((entity) => this.mapper.toDomain(entity));
    }

    async findByEvent(event: string): Promise<Array<NotificationAnemic>> {
        const entities = await this.repository.find({
            where: { event },
            withDeleted: true,
        });
        return entities.map((entity) => this.mapper.toDomain(entity));
    }

    async findById(id: string): Promise<NotificationAnemic> {
        const entity = await this.repository.findOne({
            withDeleted: true,
            where: { id },
        });
        return this.mapper.toDomain(entity);
    }

    async delete(id: string): Promise<NotificationAnemic> {
        await this.repository.softDelete(id);
        return await this.findById(id);
    }

    async save(data: NotificationDAO): Promise<NotificationDAO> {
        const entity = this.mapper.toEntity(data);
        const saved = await this.repository.save(entity);
        return this.mapper.toDomain(saved);
    }
}
