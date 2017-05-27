import {Component} from '@nestjs/common';
import {User} from '../../../core/interfaces/user.interface';
import {UserRepository} from '../repositories/user.repository';

@Component()
export class UserService {
  constructor(
    private repository: UserRepository
  ) {}

  public getAll(): Promise<User[]> {
    return this.repository.readAll();
  }
}
