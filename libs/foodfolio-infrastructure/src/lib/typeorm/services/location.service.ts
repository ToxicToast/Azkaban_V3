import { LocationService as DomainService } from '@azkaban/foodfolio-domain';
import { LocationRepository } from '../repositories';
import { CreateLocationDTO } from '../../dto';
import { LocationDAO } from '../../dao';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class LocationService {
	private readonly domainService: DomainService;

	constructor(private readonly repository: LocationRepository) {
		this.domainService = new DomainService(repository);
	}

	async getLocationList(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Array<LocationDAO>> {
		const result = await this.domainService.getLocations(limit, offset);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getLocationByFreezer(freezer: boolean): Promise<Array<LocationDAO>> {
		const result = await this.domainService.getLocationByFreezer(freezer);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getLocationByParentId(
		parent_id: Nullable<string>,
	): Promise<Array<LocationDAO>> {
		const result =
			await this.domainService.getLocationByParentId(parent_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getLocationById(id: string): Promise<LocationDAO> {
		const result = await this.domainService.getLocationById(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getLocationByTitle(title: string): Promise<LocationDAO> {
		const result = await this.domainService.getLocationByTitle(title);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async createLocation(data: CreateLocationDTO): Promise<LocationDAO> {
		const result = await this.domainService.createLocation(data);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateParentId(
		id: string,
		parent_id: Nullable<string>,
	): Promise<LocationDAO> {
		const result = await this.domainService.updateParentId(id, parent_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateTitle(id: string, title: string): Promise<LocationDAO> {
		const result = await this.domainService.updateTitle(id, title);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateActivatedAt(
		id: string,
		activated_at: Nullable<Date>,
	): Promise<LocationDAO> {
		const result = await this.domainService.updateActivatedAt(
			id,
			activated_at,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateFreezer(id: string, freezer: boolean): Promise<LocationDAO> {
		const result = await this.domainService.updateFreezer(id, freezer);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async deleteLocation(id: string): Promise<LocationDAO> {
		const result = await this.domainService.deleteLocation(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async restoreLocation(id: string): Promise<LocationDAO> {
		const result = await this.domainService.restoreLocation(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}
}
