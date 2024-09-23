import { ViewerFactory } from '../factories';
import { ViewerRepository } from '../repositories';
import { ViewerAnemic } from '../anemics';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { GenericErrorCodes } from '@toxictoast/azkaban-base-helpers';
import { ViewerData } from '../data';

export class ViewerService {
	private readonly factory: ViewerFactory = new ViewerFactory();

	constructor(private readonly repository: ViewerRepository) {}

	private async save(anemic: ViewerAnemic): Promise<Result<ViewerAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<ViewerAnemic>(result);
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}

	async getViewers(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Result<Array<ViewerAnemic>>> {
		try {
			const result = await this.repository.findList(limit, offset);
			return Result.ok<Array<ViewerAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<ViewerAnemic>>(error);
		}
	}

	async getViewerById(id: string): Promise<Result<ViewerAnemic>> {
		try {
			const result = await this.repository.findById(id);
			if (result !== null) {
				return Result.ok<ViewerAnemic>(result);
			}
			return Result.fail<ViewerAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}

	async getViewerByDisplayName(
		display_name: string,
	): Promise<Result<ViewerAnemic>> {
		try {
			const result =
				await this.repository.findByDisplayName(display_name);
			if (result !== null) {
				return Result.ok<ViewerAnemic>(result);
			}
			return Result.fail<ViewerAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}

	async createViewer(data: ViewerData): Promise<Result<ViewerAnemic>> {
		try {
			const check = await this.getViewerByDisplayName(data.display_name);
			if (check.isSuccess) {
				return Result.fail<ViewerAnemic>(GenericErrorCodes.UNKNOWN);
			}
			const aggregate = this.factory.createDomain(data);
			return await this.save(aggregate.toAnemic());
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}

	async deleteViewer(id: string): Promise<Result<ViewerAnemic>> {
		try {
			const viewer = await this.getViewerById(id);
			if (viewer.isSuccess) {
				const viewerValue = viewer.value;
				const aggregate = this.factory.reconstitute(viewerValue);
				aggregate.delete();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ViewerAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}

	async restoreViewer(id: string): Promise<Result<ViewerAnemic>> {
		try {
			const viewer = await this.getViewerById(id);
			if (viewer.isSuccess) {
				const viewerValue = viewer.value;
				const aggregate = this.factory.reconstitute(viewerValue);
				aggregate.restore();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ViewerAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}

	async updateLastSeenAt(
		id: string,
		lastseen_at: Nullable<Date>,
	): Promise<Result<ViewerAnemic>> {
		try {
			const viewer = await this.getViewerById(id);
			if (viewer.isSuccess) {
				const viewerValue = viewer.value;
				const aggregate = this.factory.reconstitute(viewerValue);
				aggregate.updateLastSeenAt(lastseen_at);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ViewerAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}

	async updateJoins(
		id: string,
		joins: number,
	): Promise<Result<ViewerAnemic>> {
		try {
			const viewer = await this.getViewerById(id);
			if (viewer.isSuccess) {
				const viewerValue = viewer.value;
				const aggregate = this.factory.reconstitute(viewerValue);
				aggregate.updateJoins(joins);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ViewerAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}

	async updateParts(
		id: string,
		parts: number,
	): Promise<Result<ViewerAnemic>> {
		try {
			const viewer = await this.getViewerById(id);
			if (viewer.isSuccess) {
				const viewerValue = viewer.value;
				const aggregate = this.factory.reconstitute(viewerValue);
				aggregate.updateParts(parts);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ViewerAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}

	async updateMessages(
		id: string,
		messages: number,
	): Promise<Result<ViewerAnemic>> {
		try {
			const viewer = await this.getViewerById(id);
			if (viewer.isSuccess) {
				const viewerValue = viewer.value;
				const aggregate = this.factory.reconstitute(viewerValue);
				aggregate.updateMessages(messages);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ViewerAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}

	async updateTimeouts(
		id: string,
		timeouts: number,
	): Promise<Result<ViewerAnemic>> {
		try {
			const viewer = await this.getViewerById(id);
			if (viewer.isSuccess) {
				const viewerValue = viewer.value;
				const aggregate = this.factory.reconstitute(viewerValue);
				aggregate.updateTimeouts(timeouts);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ViewerAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}

	async updateBans(id: string, bans: number): Promise<Result<ViewerAnemic>> {
		try {
			const viewer = await this.getViewerById(id);
			if (viewer.isSuccess) {
				const viewerValue = viewer.value;
				const aggregate = this.factory.reconstitute(viewerValue);
				aggregate.updateBans(bans);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ViewerAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}

	async updateMinutesWatched(
		id: string,
		minutes_watched: number,
	): Promise<Result<ViewerAnemic>> {
		try {
			const viewer = await this.getViewerById(id);
			if (viewer.isSuccess) {
				const viewerValue = viewer.value;
				const aggregate = this.factory.reconstitute(viewerValue);
				aggregate.updateMinutesWatched(minutes_watched);
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<ViewerAnemic>(GenericErrorCodes.NOT_FOUND);
		} catch (error) {
			return Result.fail<ViewerAnemic>(error);
		}
	}
}
