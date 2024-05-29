import { AuthRepository as DomainRepository } from '@azkaban/auth-domain';
import { Repository } from 'typeorm';
import { AuthGroupMapper } from '../mappers';
import { AuthGroupEntity } from '../entities';
import { AuthGroupDAO } from '../../dao';

export class AuthGroupRepository implements DomainRepository {
  private readonly mapper: AuthGroupMapper = new AuthGroupMapper();

  constructor(private readonly repository: Repository<AuthGroupEntity>) {}

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async save(data: AuthGroupDAO): Promise<AuthGroupDAO> {
    const entity = this.mapper.toEntity(data);
    const saved = await this.repository.save(entity);
    if (saved) {
      return this.mapper.toDomain(saved);
    }
    return null;
  }
}
