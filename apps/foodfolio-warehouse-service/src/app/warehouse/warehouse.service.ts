import { Inject, Injectable } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';
import {
    WarehouseDAO,
    WarehouseEntity,
    WarehouseRepository,
    WarehouseService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class WarehouseService {
    private readonly infrastructureRepository: WarehouseRepository;
    private readonly infrastructureService: BaseService;

    constructor(
        @Inject('WAREHOUSE_REPOSITORY')
        private readonly typeRepository: Repository<WarehouseEntity>,
    ) {
        this.infrastructureRepository = new WarehouseRepository(
            this.typeRepository,
        );
        this.infrastructureService = new BaseService(
            this.infrastructureRepository,
        );
    }

    async getList(limit: number, offset: number): Promise<Array<WarehouseDAO>> {
        return await this.infrastructureService.getWarehouseList(limit, offset);
    }

    async getById(id: string): Promise<WarehouseDAO> {
        return await this.infrastructureService.getWarehouseById(id);
    }

    async createWarehouse(title: string): Promise<WarehouseDAO> {
        return await this.infrastructureService.createWarehouse({
            title,
        });
    }

    async updateWarehouse(
        id: string,
        title?: Optional<string>,
        activated_at?: Optional<Date>,
    ): Promise<WarehouseDAO> {
        if (title !== undefined) {
            await this.infrastructureService.updateTitle(id, title);
        }
        if (activated_at !== undefined) {
            await this.infrastructureService.updateActivatedAt(
                id,
                activated_at,
            );
        }
        return await this.infrastructureService.getWarehouseById(id);
    }

    async deleteWarehouse(id: string): Promise<WarehouseDAO> {
        return await this.infrastructureService.deleteWarehouse(id);
    }

    async restoreWarehouse(id: string): Promise<WarehouseDAO> {
        return await this.infrastructureService.restoreWarehouse(id);
    }
}
