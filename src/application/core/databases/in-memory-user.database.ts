import {UserDetail} from '../interfaces/user-detail.interface';
import {CrudService} from '../interfaces/crud.interface';

export class InMemoryUserDatabase implements CrudService<UserDetail> {
  private currentId: number = 0;
  private users: UserDetail[] = [];
  private LATENCY_IN_MILLI_SECONDS: number = 200;

  constructor() {}

  public create(user: UserDetail): Promise<UserDetail> {
    return new Promise(resolve => {
      setTimeout(() => {
        user.id = this.currentId++;
        this.users.push(user);
        resolve(user);
      }, this.LATENCY_IN_MILLI_SECONDS);
    });
  }

  public read(filter?: any): Promise<UserDetail[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.users);
      }, this.LATENCY_IN_MILLI_SECONDS);
    });
  }

  public update(user: UserDetail): Promise<UserDetail> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.users[user.id] = user;
        resolve();
      }, this.LATENCY_IN_MILLI_SECONDS);
    });
  }

  public delete(user: UserDetail): Promise<UserDetail> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, this.LATENCY_IN_MILLI_SECONDS);
    });
  }
}
