import 'rxjs/add/operator/finally';
import {EnvironmentRpcClientController} from './environment-rcp-client.controller';
import * as sinon from 'sinon';
import {ClientTCP} from '@nestjs/microservices/client/client-tcp';
import {expect} from 'chai';
import {NestFactory} from '@nestjs/core';
import {Module} from '@nestjs/common';
import {INestApplication} from '@nestjs/common/interfaces/nest-application.interface';
import {ExpressAdapter} from '@nestjs/core/adapters/express-adapter';
import * as supertest from 'supertest';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

describe('environment', () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  @Module({
    controllers: [
      EnvironmentRpcClientController
    ]
  })
  class TestingAppModule {}

  let instance = ExpressAdapter.create();
  let application: INestApplication;
  beforeEach(() => {
    application = NestFactory.create(TestingAppModule, instance);
    application.init();
  });

  let sendStub;
  beforeEach(() => {
    sendStub = sandbox.stub(ClientTCP.prototype, 'send').callsFake(() => Observable.of('data') );
  });

  it('should request environment data from service', () => {
    return supertest(instance)
      .get('/?moduleName=moduleName')
      .then(response => {
        expect(sendStub.calledOnce).to.be.true;
        expect(response.body).to.be.deep.equal({ data: 'data' });
      });
  });
});