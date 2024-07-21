import { WarehouseService as DomainService } from '@azkaban/foodfolio-domain';
import { WarehouseRepository } from '../repositories';
import { CreateWarehouseDTO } from '../../dto';
import { WarehouseDAO } from '../../dao';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class WarehouseService {
    private readonly domainService: DomainService;

    constructor(private readonly repository: WarehouseRepository) {
        this.domainService = new DomainService(repository);
    }

    async getWarehouseList(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Array<WarehouseDAO>> {
        const result = await this.domainService.getWarehouses(limit, offset);
        if (result.isSuccess) {
            return result.value;
        } else {
            return [];
        }
    }

    async getWarehouseById(id: string): Promise<WarehouseDAO> {
        const result = await this.domainService.getWarehouseById(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async createWarehouse(data: CreateWarehouseDTO): Promise<WarehouseDAO> {
        const result = await this.domainService.createWarehouse(data);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async updateTitle(id: string, title: string): Promise<WarehouseDAO> {
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
    ): Promise<WarehouseDAO> {
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

    async deleteWarehouse(id: string): Promise<WarehouseDAO> {
        const result = await this.domainService.deleteWarehouse(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async restoreWarehouse(id: string): Promise<WarehouseDAO> {
        const result = await this.domainService.restoreWarehouse(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }
}
