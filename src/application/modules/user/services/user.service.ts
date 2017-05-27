import {Component} from '@nestjs/common';
import {User} from '../../../core/interfaces/user.interface';
import {UserRepository} from '../repositories/user.repository';
import {UserDetail} from '../../../core/interfaces/user-detail.interface';

@Component()
export class UserService {
  constructor(
    private repository: UserRepository
  ) {}

  public async getAll(): Promise<User[]> {
    const userDetails: UserDetail[] = await this.repository.readAll();
    return userDetails.map(userDetail => {
      return { id: userDetail.id, nickname: userDetail.nickname };
    });
  }
}
