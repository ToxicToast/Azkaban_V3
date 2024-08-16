import {
	ItemVariantRepository as DomainRepository,
	ItemVariantAnemic,
} from '@azkaban/foodfolio-domain';
import { Repository } from 'typeorm';
import { ItemVariantMapper } from '../mappers';
import { ItemVariantEntity } from '../entities';
import { ItemVariantDAO } from '../../dao';
import { Nullable } from '@toxictoast/azkaban-base-types';

export class ItemVariantRepository implements DomainRepository {
	private readonly mapper: ItemVariantMapper = new ItemVariantMapper();

	constructor(private readonly repository: Repository<ItemVariantEntity>) {}

	async findList(
		limit?: number,
		offset?: number,
	): Promise<Array<ItemVariantAnemic>> {
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
	): Promise<Array<ItemVariantAnemic>> {
		const entities = await this.repository.find({
			where: { item_id },
			withDeleted: true,
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findByCategoryId(
		category_id: Nullable<string>,
	): Promise<Array<ItemVariantAnemic>> {
		const entities = await this.repository.find({
			where: { category_id },
			withDeleted: true,
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findByLocationId(
		location_id: Nullable<string>,
	): Promise<Array<ItemVariantAnemic>> {
		const entities = await this.repository.find({
			where: { location_id },
			withDeleted: true,
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findByCompanyId(
		company_id: Nullable<string>,
	): Promise<Array<ItemVariantAnemic>> {
		const entities = await this.repository.find({
			where: { company_id },
			withDeleted: true,
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findBySizeId(
		size_id: Nullable<string>,
	): Promise<Array<ItemVariantAnemic>> {
		const entities = await this.repository.find({
			where: { size_id },
			withDeleted: true,
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findByTypeId(
		type_id: Nullable<string>,
	): Promise<Array<ItemVariantAnemic>> {
		const entities = await this.repository.find({
			where: { type_id },
			withDeleted: true,
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findByWarehouseId(
		warehouse_id: Nullable<string>,
	): Promise<Array<ItemVariantAnemic>> {
		const entities = await this.repository.find({
			where: { warehouse_id },
			withDeleted: true,
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findById(id: string): Promise<ItemVariantAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { id },
		});
		return this.mapper.toDomain(entity);
	}

	async delete(id: string): Promise<ItemVariantAnemic> {
		await this.repository.softDelete(id);
		return await this.findById(id);
	}

	async save(data: ItemVariantDAO): Promise<ItemVariantDAO> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		return this.mapper.toDomain(saved);
	}
}
