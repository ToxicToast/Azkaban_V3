import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { LocationDAO } from '@azkaban/foodfolio-infrastructure';
import { FoodfolioLocationTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class LocationService {
    constructor(
        @Inject('LOCATION_SERVICE') private readonly client: ClientProxy,
        private readonly notifSerivce: NotifyService,
    ) {}

    async getLocations(
        limit: number,
        offset: number,
    ): Promise<Array<LocationDAO>> {
        return await this.client
            .send(FoodfolioLocationTopics.LIST, { limit, offset })
            .toPromise();
    }

    async getLocationByParentId(
        parent_id: Nullable<string>,
    ): Promise<Array<LocationDAO>> {
        return await this.client
            .send(FoodfolioLocationTopics.PARENT, { parent_id })
            .toPromise();
    }

    async getLocationByFreezer(freezer: boolean): Promise<Array<LocationDAO>> {
        return await this.client
            .send(FoodfolioLocationTopics.FREEZER, { freezer })
            .toPromise();
    }

    async getLocationById(id: string): Promise<LocationDAO> {
        return await this.client
            .send(FoodfolioLocationTopics.ID, { id })
            .toPromise();
    }

    async createLocation(
        title: string,
        freezer: boolean,
        parent_id?: Optional<Nullable<string>>,
    ): Promise<LocationDAO> {
        return await this.client
            .send(FoodfolioLocationTopics.CREATE, { title, parent_id, freezer })
            .toPromise()
            .then((value) => {
                this.notifSerivce.onCreateLocation(value.id, value.title);
                return value;
            });
    }

    async updateLocation(
        id: string,
        title?: Optional<string>,
        parent_id?: Optional<Nullable<string>>,
        freezer?: Optional<boolean>,
        activated_at?: Optional<Nullable<Date>>,
    ): Promise<LocationDAO> {
        return await this.client
            .send(FoodfolioLocationTopics.UPDATE, {
                id,
                title,
                parent_id,
                freezer,
                activated_at,
            })
            .toPromise();
    }

    async deleteLocation(id: string): Promise<LocationDAO> {
        return await this.client
            .send(FoodfolioLocationTopics.DELETE, { id })
            .toPromise();
    }

    async restoreLocation(id: string): Promise<LocationDAO> {
        return await this.client
            .send(FoodfolioLocationTopics.RESTORE, { id })
            .toPromise();
    }
}
