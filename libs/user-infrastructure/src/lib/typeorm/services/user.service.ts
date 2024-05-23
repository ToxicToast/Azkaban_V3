import { UserService as DomainService } from '@azkaban/user-domain';
import { UserRepository } from '../repositories';
import { CreateUserDTO } from '../../dto';
import { UserDAO } from '../../dao';
import { Optional } from '@toxictoast/azkaban-base-types';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthErrorCodes } from '@toxictoast/azkaban-base-helpers';

export class UserService {
  private readonly domainService: DomainService;

  constructor(private readonly repository: UserRepository) {
    this.domainService = new DomainService(repository);
  }

  async getUserList(
    limit?: Optional<number>,
    offset?: Optional<number>,
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

  async getUserByUsername(username: string): Promise<UserDAO> {
    const result = await this.domainService.getUserByUsername(username);
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new NotFoundException(errorMessage);
    }
  }

  async createUser(data: CreateUserDTO): Promise<UserDAO> {
    const checkEmail = await this.domainService.getUserByEmail(data.email);
    const checkUsername = await this.domainService.getUserByUsername(
      data.username,
    );
    if (checkEmail.isSuccess) {
      throw new BadRequestException(AuthErrorCodes.EMAIL_FOUND);
    }
    if (checkUsername.isSuccess) {
      throw new BadRequestException(AuthErrorCodes.USERNAME_FOUND);
    }
    //
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
    const result = await this.domainService.changeStatus(id, new Date());
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new NotFoundException(errorMessage);
    }
  }

  async deactivateUser(id: string): Promise<UserDAO> {
    const result = await this.domainService.changeStatus(id, null);
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new NotFoundException(errorMessage);
    }
  }

  async banUser(id: string): Promise<UserDAO> {
    const result = await this.domainService.changeBan(id, new Date());
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new NotFoundException(errorMessage);
    }
  }

  async findUserByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<UserDAO> {
    const result = await this.domainService.getUserByUsernameAndPassword(
      username,
      password,
    );
    if (result.isSuccess) {
      return result.value;
    } else {
      const errorMessage = result.errorValue;
      throw new BadRequestException(errorMessage, {});
    }
  }
}
