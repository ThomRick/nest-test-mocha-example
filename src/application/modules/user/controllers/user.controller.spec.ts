import {Test} from '@nestjs/testing';
import {UserController} from './user.controller';
import {expect} from 'chai';
import * as httpMocks from 'node-mocks-http';
import {EventEmitter} from 'events';
import * as sinon from 'sinon';
import {UserService} from '../services/user.service';
import {UserRepository} from '../repositories/user.repository';

describe('UserController', () => {
  let controller: UserController;

  let sandbox: sinon.SinonSandbox;

  let request: httpMocks.MockRequest;
  let response: httpMocks.MockResponse;

  beforeEach(() => {
    Test.createTestingModule({
      controllers: [
        UserController
      ],
      components: [
        {
          provide: UserService,
          useValue: {
            getAll: () => {}
          }
        }
      ]
    });
    controller = Test.get(UserController);
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#getAll()', () => {
    let getAllStub: sinon.SinonStub;

    beforeEach(() => {
      const service: UserService = Test.get(UserService);
      getAllStub = sandbox.stub(service, 'getAll').callsFake(() => Promise.resolve([]));
    });

    beforeEach(() => {
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users'
      });
      response = httpMocks.createResponse({
        eventEmitter: EventEmitter
      });
    });

    it('should respond with a status 200', done => {
      response.on('end', () => {
        expect(response._getStatusCode()).to.be.equal(200);
        done();
      });
      controller.getAll(response);
    });

    it('should respond with a JSON', done => {
      response.on('end', () => {
        expect(response._isJSON()).to.be.true;
        done();
      });
      controller.getAll(response);
    });

    it('should call UserService.getAll() once', done => {
      response.on('end', () => {
        expect(getAllStub.calledOnce).to.be.true;
        done();
      });
      controller.getAll(response);
    });
  });

  describe('#create()', () => {
    it('should respond with status 201', done => {
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/users',
        body: { nickname: 'nickname' }
      });
      response = httpMocks.createResponse({
        eventEmitter: EventEmitter
      });
      response.on('end', () => {
        expect(response._getStatusCode()).to.be.equal(201);
        done();
      });
      controller.create(request.body, response);
    });
  });
});
