import {Test} from '@nestjs/testing';
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

  beforeEach(() => {
    Test.createTestingModule({
      modules: [
        TestingAppModule
      ]
    });
  });

  let sendStub;
  beforeEach(() => {
    sendStub = sandbox.stub(ClientTCP.prototype, 'send');
  });

  it('should request environment data from service', () => {
    return supertest(instance)
      .get('/')
      .then(() => {
        expect(sendStub.calledOnce).to.be.true;
      });
  });
});