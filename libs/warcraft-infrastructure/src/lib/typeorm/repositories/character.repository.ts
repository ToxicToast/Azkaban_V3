import {
	CharacterRepository as DomainRepository,
	CharacterAnemic,
} from '@azkaban/warcraft-domain';
import { CharacterMapper } from '../mappers';
import { Repository } from 'typeorm';
import { CharacterEntity } from '../entities';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class CharacterRepository implements DomainRepository {
	private readonly mapper: CharacterMapper = new CharacterMapper();

	constructor(private readonly repository: Repository<CharacterEntity>) {}

	async findList(
		limit?: number,
		offset?: number,
	): Promise<Array<CharacterAnemic>> {
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

	async findById(id: string): Promise<CharacterAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByRegionRealmName(
		region: string,
		realm: string,
		name: string,
	): Promise<CharacterAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { region, realm, name },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByUserId(
		user_id: Nullable<string>,
	): Promise<Array<CharacterAnemic>> {
		const entities = await this.repository.find({
			where: { user_id },
			withDeleted: true,
			order: {
				created_at: 'ASC',
			},
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findByGuild(guild: string): Promise<Array<CharacterAnemic>> {
		const entities = await this.repository.find({
			where: { guild },
			withDeleted: true,
			order: {
				created_at: 'ASC',
			},
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async delete(id: string): Promise<CharacterAnemic> {
		await this.repository.softDelete(id);
		return await this.findById(id);
	}

	async save(data: CharacterAnemic): Promise<CharacterAnemic> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		if (saved) {
			return this.mapper.toDomain(saved);
		}
		return null;
	}
}
