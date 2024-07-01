import { SizeService as DomainService } from '@azkaban/foodfolio-domain';
import { SizeRepository } from '../repositories';
import { CreateSizeDTO } from '../../dto';
import { SizeDAO } from '../../dao';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class SizeService {
    private readonly domainService: DomainService;

    constructor(private readonly repository: SizeRepository) {
        this.domainService = new DomainService(repository);
    }

    async getSizeList(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Array<SizeDAO>> {
        const result = await this.domainService.getSizes(limit, offset);
        if (result.isSuccess) {
            return result.value;
        } else {
            return [];
        }
    }

    async getSizeById(id: string): Promise<SizeDAO> {
        const result = await this.domainService.getSizeById(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async createSize(data: CreateSizeDTO): Promise<SizeDAO> {
        const result = await this.domainService.createSize(data);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async updateTitle(id: string, title: string): Promise<SizeDAO> {
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
    ): Promise<SizeDAO> {
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

    async deleteSize(id: string): Promise<SizeDAO> {
        const result = await this.domainService.deleteSize(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async restoreSize(id: string): Promise<SizeDAO> {
        const result = await this.domainService.restoreSize(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }
}
