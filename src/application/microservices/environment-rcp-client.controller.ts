import {Client, ClientProxy} from '@nestjs/microservices';
import {Controller, Get} from '@nestjs/common';
import {Transport} from '@nestjs/microservices/enums';
import 'rxjs/add/operator/toPromise';

@Controller()
export class EnvironmentRpcClientController {

  @Client({ transport: Transport.TCP, port: 3000 })
  private client: ClientProxy;

  @Get()
  public get<T extends Object>(moduleName?: string): Promise<T> {
    const pattern = { cmd: 'get' };
    return this.client.send<T>(pattern, moduleName).toPromise();
  }
}
