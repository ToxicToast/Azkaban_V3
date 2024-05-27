import { Inject, Injectable } from '@nestjs/common';
import {
  AuthEntity,
  AuthRepository,
  AuthService as BaseService,
} from '@azkaban/auth-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private readonly infrastructureRepository: AuthRepository;
  private readonly infrastructureService: BaseService;

  constructor(
    @Inject('AUTH_REPOSITORY')
    private readonly authRepository: Repository<AuthEntity>,
    @Inject('PASSWORD_SALT') private readonly passwordSalt: string,
  ) {
    this.infrastructureRepository = new AuthRepository(this.authRepository);
    this.infrastructureService = new BaseService(this.infrastructureRepository);
  }

  async createAuth(email: string, username: string, password: string) {
    return await this.infrastructureService.createAuth({
      email,
      username,
      password,
    });
  }

  async login(username: string, password: string) {
    return await this.infrastructureService
      .login(username, password, this.passwordSalt)
      .then(async (res) => {
        return {
          id: res.id,
          username: res.username,
          email: res.email,
        };
      });
  }

  async activateAccount(email: string, token: string) {
    return await this.infrastructureService.activateAccount(email, token);
  }
}
