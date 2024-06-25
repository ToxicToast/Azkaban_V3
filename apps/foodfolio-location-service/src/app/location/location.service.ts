import { Inject, Injectable } from '@nestjs/common';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import {
    LocationDAO,
    LocationEntity,
    LocationRepository,
    LocationService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
    private readonly infrastructureRepository: LocationRepository;
    private readonly infrastructureService: BaseService;

    constructor(
        @Inject('LOCATION_REPOSITORY')
        private readonly companyRepository: Repository<LocationEntity>,
    ) {
        this.infrastructureRepository = new LocationRepository(
            this.companyRepository,
        );
        this.infrastructureService = new BaseService(
            this.infrastructureRepository,
        );
    }

    async getList(limit: number, offset: number): Promise<Array<LocationDAO>> {
        return await this.infrastructureService.getLocationList(limit, offset);
    }

    async getById(id: string): Promise<LocationDAO> {
        return await this.infrastructureService.getLocationById(id);
    }

    async getByParentId(
        parent_id: Nullable<string>,
    ): Promise<Array<LocationDAO>> {
        return await this.infrastructureService.getLocationByParentId(
            parent_id,
        );
    }

    async getByFreezer(freezer: boolean): Promise<Array<LocationDAO>> {
        return await this.infrastructureService.getLocationByFreezer(freezer);
    }

    async createLocation(
        title: string,
        parent_id: Nullable<string>,
        freezer: boolean,
    ): Promise<LocationDAO> {
        return await this.infrastructureService.createLocation({
            title,
            parent_id,
            freezer,
        });
    }

    async updateLocation(
        id: string,
        title?: Optional<string>,
        parent_id?: Optional<string>,
        freezer?: Optional<boolean>,
        activated_at?: Optional<Date>,
    ): Promise<LocationDAO> {
        if (title !== undefined) {
            await this.infrastructureService.updateTitle(id, title);
        }
        if (parent_id !== undefined) {
            await this.infrastructureService.updateParentId(id, parent_id);
        }
        if (freezer !== undefined) {
            await this.infrastructureService.updateFreezer(id, freezer);
        }
        if (activated_at !== undefined) {
            await this.infrastructureService.updateActivatedAt(
                id,
                activated_at,
            );
        }
        return await this.infrastructureService.getLocationById(id);
    }

    async deleteLocation(id: string): Promise<LocationDAO> {
        return await this.infrastructureService.deleteLocation(id);
    }

    async restoreLocation(id: string): Promise<LocationDAO> {
        return await this.infrastructureService.restoreLocation(id);
    }
}
