import {
	ViewerRepository as DomainRepository,
	ViewerAnemic,
} from '@azkaban/twitch-domain';
import { Repository } from 'typeorm';
import { ViewerMapper } from '../mappers';
import { ViewerEntity } from '../entities';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class ViewerRepository implements DomainRepository {
	private readonly mapper: ViewerMapper = new ViewerMapper();

	constructor(private readonly repository: Repository<ViewerEntity>) {}

	async findList(
		limit?: number,
		offset?: number,
	): Promise<Array<ViewerAnemic>> {
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

	async findById(id: string): Promise<ViewerAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByDisplayName(display_name: string): Promise<ViewerAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { display_name },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByUserId(
		user_id: Nullable<string>,
	): Promise<Array<ViewerAnemic>> {
		const entities = await this.repository.find({
			withDeleted: true,
			where: { user_id },
			order: {
				created_at: 'ASC',
			},
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async delete(id: string): Promise<ViewerAnemic> {
		await this.repository.softDelete(id);
		return await this.findById(id);
	}

	async save(data: ViewerAnemic): Promise<ViewerAnemic> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		if (saved) {
			return this.mapper.toDomain(saved);
		}
		return null;
	}
}
