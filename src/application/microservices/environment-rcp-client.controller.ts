import {Client, ClientProxy} from '@nestjs/microservices';
import {Controller} from '@nestjs/common';
import {Transport} from '@nestjs/microservices/enums';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Controller()
export class EnvironmentRpcClientController {

  @Client({ transport: Transport.TCP, port: 3000 })
  private client: ClientProxy;

  public get<T extends Object>(moduleName?: string): Observable<T> {
    console.log(this.client);
    const pattern = { cmd: 'get' };
    return this.client.send<T>(pattern, moduleName);
  }
}
