import { UserService as DomainService } from '@azkaban/user-domain';
import { UserRepository } from '../repositories';
import { CreateUserDTO } from '../../dto';
import { UserDAO } from '../../dao';
import { Optional } from '@toxictoast/azkaban-base-types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class UserService {
  private readonly domainService: DomainService;

  constructor(private readonly repository: UserRepository) {
    this.domainService = new DomainService(repository);
  }

  async getUserList(
    limit?: Optional<number>,
    offset?: Optional<number>
  ): Promise<Array<UserDAO>> {
    const result = await this.domainService.getUsers(limit, offset);
    if (result.isSuccess) {
      return result.value;
    } else {
      return [];
    }
  }

  async getUserById(id: string): Promise<UserDAO> {
    const result = await this.domainService.getUserById(id);
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new NotFoundException(errorMessage);
    }
  }

  async getUserByEmail(email: string): Promise<UserDAO> {
    const result = await this.domainService.getUserByEmail(email);
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new NotFoundException(errorMessage);
    }
  }

  async createUser(data: CreateUserDTO): Promise<UserDAO> {
    const result = await this.domainService.createUser(data);
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new BadRequestException(errorMessage);
    }
  }

  async updateUsername(id: string, username: string): Promise<UserDAO> {
    const result = await this.domainService.updateUsername(id, username);
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new BadRequestException(errorMessage);
    }
  }

  async updateEmail(id: string, email: string): Promise<UserDAO> {
    const result = await this.domainService.updateEmail(id, email);
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new BadRequestException(errorMessage);
    }
  }

  async updatePassword(id: string, password: string): Promise<UserDAO> {
    const result = await this.domainService.updatePassword(id, password);
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new BadRequestException(errorMessage);
    }
  }

  async deleteUser(id: string): Promise<UserDAO> {
    const result = await this.domainService.deleteUser(id);
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new NotFoundException(errorMessage);
    }
  }

  async restoreUser(id: string): Promise<UserDAO> {
    const result = await this.domainService.restoreUser(id);
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new NotFoundException(errorMessage);
    }
  }

  async activateUser(id: string): Promise<UserDAO> {
    const result = await this.domainService.changeStatus(id, true);
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new NotFoundException(errorMessage);
    }
  }

  async deactivateUser(id: string): Promise<UserDAO> {
    const result = await this.domainService.changeStatus(id, false);
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new NotFoundException(errorMessage);
    }
  }

  async findUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<UserDAO> {
    const result = await this.domainService.getUserByUsernameAndPassword(
      username,
      password
    );
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      console.error(errorMessage);
      throw new BadRequestException(errorMessage, {});
    }
  }
}
