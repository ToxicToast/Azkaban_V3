import { TypeService as DomainService } from '@azkaban/foodfolio-domain';
import { TypeRepository } from '../repositories';
import { CreateTypeDTO } from '../../dto';
import { TypeDAO } from '../../dao';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class TypeService {
    private readonly domainService: DomainService;

    constructor(private readonly repository: TypeRepository) {
        this.domainService = new DomainService(repository);
    }

    async getTypeList(
        limit?: Optional<number>,
        offset?: Optional<number>,
    ): Promise<Array<TypeDAO>> {
        const result = await this.domainService.getTypes(limit, offset);
        if (result.isSuccess) {
            return result.value;
        } else {
            return [];
        }
    }

    async getTypeById(id: string): Promise<TypeDAO> {
        const result = await this.domainService.getTypeById(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async createType(data: CreateTypeDTO): Promise<TypeDAO> {
        const result = await this.domainService.createType(data);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new BadRequestException(errorMessage);
        }
    }

    async updateTitle(id: string, title: string): Promise<TypeDAO> {
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
    ): Promise<TypeDAO> {
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

    async deleteType(id: string): Promise<TypeDAO> {
        const result = await this.domainService.deleteType(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }

    async restoreType(id: string): Promise<TypeDAO> {
        const result = await this.domainService.restoreType(id);
        if (result.isSuccess) {
            return result.value;
        } else {
            const errorMessage = result.errorValue;
            throw new NotFoundException(errorMessage);
        }
    }
}
