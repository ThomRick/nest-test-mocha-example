import {Client, ClientProxy} from '@nestjs/microservices';
import {Controller, Get, Req, Res} from '@nestjs/common';
import {Transport} from '@nestjs/microservices/enums';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Controller()
export class EnvironmentRpcClientController {

  @Client({ transport: Transport.TCP, port: 3000 })
  private client: ClientProxy;

  @Get()
  public get<T extends Object>(@Req() request, @Res() response): void {
    const pattern = { cmd: 'get' };
    const moduleName = request.query.moduleName;
    this.client.send<T>(pattern, moduleName)
      .subscribe(result => response.json({ data: result }));
  }
}
