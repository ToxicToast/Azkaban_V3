import { AuthRepository as DomainRepository } from '@azkaban/auth-domain';
import { Repository } from 'typeorm';
import { AuthMapper } from '../mappers';
import { AuthDAO } from '../../dao';
import { UserEntity } from '@azkaban/user-infrastructure';

export class AuthRepository implements DomainRepository {
  private readonly mapper: AuthMapper = new AuthMapper();

  constructor(private readonly repository: Repository<UserEntity>) {}

  async findByEmail(email: string): Promise<AuthDAO> {
    const entity = await this.repository.findOne({
      withDeleted: true,
      where: { email },
      relations: ['groups'],
    });

    if (entity) {
      return this.mapper.toDomain(entity);
    }
    return null;
  }

  async findByUsername(username: string): Promise<AuthDAO> {
    const entity = await this.repository.findOne({
      withDeleted: true,
      where: { username },
      relations: ['groups'],
    });

    if (entity) {
      return this.mapper.toDomain(entity);
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async save(data: AuthDAO): Promise<AuthDAO> {
    const entity = this.mapper.toEntity(data);
    const saved = await this.repository.save(entity);
    if (saved) {
      return this.mapper.toDomain(saved);
    }
    return null;
  }
}
