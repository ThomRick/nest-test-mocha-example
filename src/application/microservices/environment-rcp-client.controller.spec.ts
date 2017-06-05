import 'rxjs/add/operator/finally';
import {EnvironmentRpcClientController} from './environment-rcp-client.controller';
import * as sinon from 'sinon';
import {ClientTCP} from '@nestjs/microservices/client/client-tcp';
import {expect} from 'chai';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {Test} from './testing';

describe('environment', () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  beforeEach(() => {
    Test.createTestingModule({
      controllers: [
        EnvironmentRpcClientController
      ]
    });
  });

  let controller: EnvironmentRpcClientController;
  beforeEach(() => {
    controller = Test.get(EnvironmentRpcClientController);
  });

  let sendStub;
  beforeEach(() => {
    sendStub = sandbox.stub(ClientTCP.prototype, 'send').callsFake(() => Observable.of('data') );
  });

  it('should request environment data from service', done => {
    controller.get('test')
      .subscribe(result => {
        expect(sendStub.calledOnce).to.be.true;
        expect(result).to.be.deep.equal('data');
        done();
      });
  });
});