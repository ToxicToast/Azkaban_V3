import { GroupService as DomainService } from '@azkaban/group-domain';
import { GroupRepository } from '../repositories';
import { Optional } from '@toxictoast/azkaban-base-types';
import { GroupDAO } from '../../dao';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateGroupDTO } from '../../dto';

export class GroupService {
	private readonly domainService: DomainService;

	constructor(private readonly repository: GroupRepository) {
		this.domainService = new DomainService(repository);
	}

	async getGroupList(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Array<GroupDAO>> {
		const result = await this.domainService.getGroups(limit, offset);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getGroupById(id: string): Promise<GroupDAO> {
		const result = await this.domainService.getGroupById(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getGroupByTitle(title: string): Promise<GroupDAO> {
		const result = await this.domainService.getGroupByTitle(title);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async createGroup(data: CreateGroupDTO): Promise<GroupDAO> {
		const result = await this.domainService.createGroup(data);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateTitle(id: string, title: string): Promise<GroupDAO> {
		const result = await this.domainService.updateTitle(id, title);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateSlug(id: string, slug: string): Promise<GroupDAO> {
		const result = await this.domainService.updateSlug(id, slug);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateActive(id: string, active: boolean): Promise<GroupDAO> {
		const result = await this.domainService.updateActive(id, active);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async deleteGroup(id: string): Promise<GroupDAO> {
		const result = await this.domainService.deleteGroup(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async restoreGroup(id: string): Promise<GroupDAO> {
		const result = await this.domainService.restoreGroup(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}
}
