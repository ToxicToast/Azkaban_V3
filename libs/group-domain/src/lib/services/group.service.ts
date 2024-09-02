import { GroupFactory } from '../factories';
import { GroupRepository } from '../repositories';
import { GroupAnemic } from '../anemics';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Optional } from '@toxictoast/azkaban-base-types';
import { GroupData } from '../data';
import {
	GenericErrorCodes,
	GroupErrorCodes,
} from '@toxictoast/azkaban-base-helpers';

export class GroupService {
	private readonly factory: GroupFactory = new GroupFactory();

	constructor(private readonly repository: GroupRepository) {}

	private async save(anemic: GroupAnemic): Promise<Result<GroupAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<GroupAnemic>(result);
		} catch (error) {
			return Result.fail<GroupAnemic>(error);
		}
	}

	async getGroups(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Result<Array<GroupAnemic>>> {
		try {
			const result = await this.repository.findList(limit, offset);
			return Result.ok<Array<GroupAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<GroupAnemic>>(error);
		}
	}

	async getGroupById(id: string): Promise<Result<GroupAnemic>> {
		try {
			const result = await this.repository.findById(id);
			if (result !== null) {
				return Result.ok<GroupAnemic>(result);
			}
			return Result.fail<GroupAnemic>(GroupErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<GroupAnemic>(error);
		}
	}

	async getGroupByTitle(title: string): Promise<Result<GroupAnemic>> {
		try {
			const result = await this.repository.findByTitle(title);
			if (result !== null) {
				return Result.ok<GroupAnemic>(result);
			}
			return Result.fail<GroupAnemic>(GroupErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<GroupAnemic>(error);
		}
	}

	async createGroup(data: GroupData): Promise<Result<GroupAnemic>> {
		try {
			const check = await this.getGroupByTitle(data.title);
			if (check.isSuccess) {
				return Result.fail<GroupAnemic>(GenericErrorCodes.UNKNOWN);
			}
			const aggregate = this.factory.createDomain(data);
			return await this.save(aggregate.toAnemic());
		} catch (error) {
			return Result.fail<GroupAnemic>(error);
		}
	}

	async deleteGroup(id: string): Promise<Result<GroupAnemic>> {
		try {
			const group = await this.getGroupById(id);
			if (group.isSuccess) {
				const groupValue = group.value;
				const aggregate = this.factory.reconstitute(groupValue);
				aggregate.delete();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<GroupAnemic>(GroupErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<GroupAnemic>(error);
		}
	}

	async restoreGroup(id: string): Promise<Result<GroupAnemic>> {
		try {
			const group = await this.getGroupById(id);
			if (group.isSuccess) {
				const groupValue = group.value;
				const aggregate = this.factory.reconstitute(groupValue);
				aggregate.restore();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<GroupAnemic>(GroupErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<GroupAnemic>(error);
		}
	}

	async updateTitle(id: string, title: string): Promise<Result<GroupAnemic>> {
		try {
			const group = await this.getGroupById(id);
			if (group.isSuccess) {
				const groupValue = group.value;
				const aggregate = this.factory.reconstitute(groupValue);
				aggregate.updateTitle(title);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<GroupAnemic>(GroupErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<GroupAnemic>(error);
		}
	}

	async updateSlug(id: string, slug: string): Promise<Result<GroupAnemic>> {
		try {
			const group = await this.getGroupById(id);
			if (group.isSuccess) {
				const groupValue = group.value;
				const aggregate = this.factory.reconstitute(groupValue);
				aggregate.updateSlug(slug);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<GroupAnemic>(GroupErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<GroupAnemic>(error);
		}
	}

	async updateActive(
		id: string,
		active: boolean,
	): Promise<Result<GroupAnemic>> {
		try {
			const group = await this.getGroupById(id);
			if (group.isSuccess) {
				const groupValue = group.value;
				const aggregate = this.factory.reconstitute(groupValue);
				aggregate.updateActive(active);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<GroupAnemic>(GroupErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<GroupAnemic>(error);
		}
	}
}
