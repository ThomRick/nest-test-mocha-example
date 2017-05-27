import {Component} from '@nestjs/common';
import {CrudService} from '../../../core/interfaces/crud.interface';
import {UserDetail} from '../../../core/interfaces/user-detail.interface';
import {InMemoryUserDatabase} from '../../../core/databases/in-memory-user.database';

@Component()
export class UserRepository {
  private database: CrudService<UserDetail> = new InMemoryUserDatabase();

  constructor() {}

  public create(user: UserDetail): Promise<UserDetail> {
    return this.database.create(user);
  }

  public readAll(): Promise<UserDetail[]> {
    return this.database.read();
  }

  public update(user: UserDetail): Promise<UserDetail> {
    return this.database.update(user);
  }

  public delete(user: UserDetail): Promise<UserDetail> {
    return this.database.delete(user);
  }

}
