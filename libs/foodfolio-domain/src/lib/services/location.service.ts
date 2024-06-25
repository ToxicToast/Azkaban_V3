import { LocationFactory } from '../factories';
import { LocationRepository } from '../repositories';
import { Result } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { GenericErrorCodes } from '@toxictoast/azkaban-base-helpers';
import { LocationAnemic } from '../anemics';
import { LocationData } from '../data';

export class LocationService {
    private readonly factory: LocationFactory = new LocationFactory();

    constructor(private readonly repository: LocationRepository) {}

    private async save(
        anemic: LocationAnemic,
    ): Promise<Result<LocationAnemic>> {
        try {
            const result = await this.repository.save(anemic);
            return Result.ok<LocationAnemic>(result);
        } catch (error) {
            return Result.fail<LocationAnemic>(error);
        }
    }

    async getLocations(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Result<Array<LocationAnemic>>> {
        try {
            const result = await this.repository.findList(limit, offset);
            return Result.ok<Array<LocationAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<LocationAnemic>>(error);
        }
    }

    async getLocationById(id: string): Promise<Result<LocationAnemic>> {
        try {
            const result = await this.repository.findById(id);
            if (result !== null) {
                return Result.ok<LocationAnemic>(result);
            }
            return Result.fail<LocationAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a LocationErrorCodes enum
        } catch (error) {
            return Result.fail<LocationAnemic>(error);
        }
    }

    async getLocationByParentId(
        parent_id: Nullable<string>,
    ): Promise<Result<Array<LocationAnemic>>> {
        try {
            const result = await this.repository.findByParentId(parent_id);
            return Result.ok<Array<LocationAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<LocationAnemic>>(error);
        }
    }

    async getLocationByFreezer(
        freezer: boolean,
    ): Promise<Result<Array<LocationAnemic>>> {
        try {
            const result = await this.repository.findByFreezer(freezer);
            return Result.ok<Array<LocationAnemic>>(result);
        } catch (error) {
            return Result.fail<Array<LocationAnemic>>(error);
        }
    }

    async createLocation(data: LocationData): Promise<Result<LocationAnemic>> {
        try {
            const aggregate = this.factory.createDomain(data);
            return await this.save(aggregate.toAnemic());
        } catch (error) {
            return Result.fail<LocationAnemic>(error);
        }
    }

    async deleteLocation(id: string): Promise<Result<LocationAnemic>> {
        try {
            const company = await this.getLocationById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.delete();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<LocationAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a LocationErrorCodes enum
        } catch (error) {
            return Result.fail<LocationAnemic>(error);
        }
    }

    async restoreLocation(id: string): Promise<Result<LocationAnemic>> {
        try {
            const company = await this.getLocationById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.restore();
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<LocationAnemic>(GenericErrorCodes.NOT_FOUND); // TODO: Create a LocationErrorCodes enum
        } catch (error) {
            return Result.fail<LocationAnemic>(error);
        }
    }

    async updateParentId(
        id: string,
        parent_id: Nullable<string>,
    ): Promise<Result<LocationAnemic>> {
        try {
            const company = await this.getLocationById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.changeParentId(parent_id);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<LocationAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<LocationAnemic>(error);
        }
    }

    async updateTitle(
        id: string,
        title: string,
    ): Promise<Result<LocationAnemic>> {
        try {
            const company = await this.getLocationById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.changeTitle(title);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<LocationAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<LocationAnemic>(error);
        }
    }

    async updateActivatedAt(
        id: string,
        activated_at: Nullable<Date>,
    ): Promise<Result<LocationAnemic>> {
        try {
            const company = await this.getLocationById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.changeActivatedAt(activated_at);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<LocationAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<LocationAnemic>(error);
        }
    }

    async updateFreezer(
        id: string,
        freezer: boolean,
    ): Promise<Result<LocationAnemic>> {
        try {
            const company = await this.getLocationById(id);
            if (company.isSuccess) {
                const companyValue = company.value;
                const aggregate = this.factory.reconstitute(companyValue);
                aggregate.changeFreezer(freezer);
                return await this.save(aggregate.toAnemic());
            }
            return Result.fail<LocationAnemic>(GenericErrorCodes.NOT_FOUND);
        } catch (error) {
            return Result.fail<LocationAnemic>(error);
        }
    }
}
